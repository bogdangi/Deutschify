// Deutschify - Topic & Exercise Data Access Layer (Repository Pattern)
// Decouples UI and application logic from raw data storage (JSON / API / Cache)

export class TopicRepository {
  constructor(baseUrl = '/data') {
    this.baseUrl = baseUrl;
    this.manifest = null;
    this.topicsCache = new Map(); // topicId -> full Topic object (with exercises)
    this.isLoaded = false;
    this._loadPromise = null;
  }

  /**
   * Loads the topics manifest (metadata without exercise bodies)
   * @returns {Promise<Array>} List of topic metadata
   */
  async getManifest() {
    if (this.manifest) return this.manifest;

    const res = await fetch(`${this.baseUrl}/topics.json`);
    if (!res.ok) {
      throw new Error(`Failed to load topics manifest (${res.status} ${res.statusText})`);
    }
    this.manifest = await res.json();
    return this.manifest;
  }

  /**
   * Loads and caches all topics with their exercises.
   * Enables instant offline study, smart session mixing and full analytics.
   * @returns {Promise<Array>} Full topics array
   */
  async loadAll() {
    if (this.isLoaded) {
      return Array.from(this.topicsCache.values());
    }

    if (this._loadPromise) {
      return this._loadPromise;
    }

    this._loadPromise = (async () => {
      const manifest = await this.getManifest();

      // Fetch all topic files in parallel
      const topicPromises = manifest.map(async (meta) => {
        if (this.topicsCache.has(meta.id)) {
          return this.topicsCache.get(meta.id);
        }
        const fileUrl = `${this.baseUrl}/${meta.file}`;
        const res = await fetch(fileUrl);
        if (!res.ok) {
          throw new Error(`Failed to fetch topic '${meta.id}' from ${fileUrl}`);
        }
        const fullTopic = await res.json();
        // Ensure totalExercises is consistent
        fullTopic.totalExercises = fullTopic.exercises ? fullTopic.exercises.length : 0;
        this.topicsCache.set(meta.id, fullTopic);
        return fullTopic;
      });

      const loadedTopics = await Promise.all(topicPromises);
      this.isLoaded = true;
      return loadedTopics;
    })();

    return this._loadPromise;
  }

  /**
   * Retrieves a single topic by ID, fetching only that topic if not yet cached.
   * @param {string} topicId
   * @returns {Promise<Object|null>}
   */
  async getTopic(topicId) {
    if (this.topicsCache.has(topicId)) {
      return this.topicsCache.get(topicId);
    }

    const manifest = await this.getManifest();
    const meta = manifest.find((t) => t.id === topicId);
    if (!meta) return null;

    const fileUrl = `${this.baseUrl}/${meta.file}`;
    const res = await fetch(fileUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch topic '${topicId}' from ${fileUrl}`);
    }
    const fullTopic = await res.json();
    fullTopic.totalExercises = fullTopic.exercises ? fullTopic.exercises.length : 0;
    this.topicsCache.set(topicId, fullTopic);
    return fullTopic;
  }

  /**
   * Synchronously get a topic from cache if already loaded
   * @param {string} topicId
   * @returns {Object|null}
   */
  getCachedTopic(topicId) {
    return this.topicsCache.get(topicId) || null;
  }

  /**
   * Synchronously get all cached topics
   * @returns {Array}
   */
  getAllCachedTopics() {
    return Array.from(this.topicsCache.values());
  }

  /**
   * Flattens and returns all exercises across all cached topics
   * @returns {Array} All exercises
   */
  getAllExercises() {
    const all = [];
    for (const topic of this.topicsCache.values()) {
      if (Array.isArray(topic.exercises)) {
        all.push(...topic.exercises);
      }
    }
    return all;
  }
}

// Global singleton instance
export const topicRepo = new TopicRepository();
