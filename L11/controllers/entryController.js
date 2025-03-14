const Entry = require('../models/entryModel');
const uploadController = require('../controllers/uploadController');

const createEntry = async (req, res) => {//
   try {
      const { title, content, hashtags, filePath, videoPath } = req.body;
      let entryObj = { title, content, userId: req.user.id, hashtags };
      let mediaArray = [];
      if (filePath) {
         const result = await uploadController.uploadImage(filePath);
         mediaArray.push(result);
      }

      if (videoPath) {
         const result = await uploadController.uploadVideo(videoPath);
         mediaArray.push(result);
      }

      entryObj.media = mediaArray;

      const newEntry = new Entry(entryObj);
      const entry = await newEntry.save();
      res.status(201).json({ entry });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const getUserEntries = async (req, res) => {
   try {
      const entries = await Entry.find({ userId: req.user.id });
      res.status(200).json({ entries });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

const deleteEntry = async (req, res) => {
   try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
         return res.status(404).json({ error: 'Entry not found' });
      }
      if (entry.userId.toString() !== req.user.id) {
         return res.status(401).json({ error: 'You can only delete your entries!' });
      }
      await Entry.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Entry removed' });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const updateEntry = async (req, res) => {//
   try {
      const { title, content, hashtags, filePath, videoPath } = req.body;
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
         return res.status(404).json({ error: 'Entry not found' });
      }
      if (entry.userId.toString() !== req.user.id) {
         return res.status(401).json({ error: 'You can only update your entries!' });
      }
      entry.title = title;
      entry.content = content;
      entry.hashtags = hashtags;
      let mediaArray = [];

      if (filePath) {
         const result = await uploadController.uploadImage(filePath);
         mediaArray.push(result);

      }
      if (videoPath) {
         const result = await uploadController.uploadVideo(videoPath);
         mediaArray.push(result);
      }
      entry.media = mediaArray;

      await entry.save();
      res.status(200).json({ entry });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getAllEntries = async (req, res) => {
   try {
      const entries = await Entry.find();
      res.status(200).json({ entries });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getLastEntriesByLimit = async (req, res) => {
   try {
      const { limit } = req.params;
      const entries = await Entry.find().sort({ createdAt: -1 }).limit(parseInt(limit));
      res.status(200).json({ entries });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const getEntryById = async (req, res) => {
   try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
         return res.status(404).json({ error: 'Entry not found' });
      }
      res.status(200).json({ entry });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}

const likeEntry = async (req, res) => {
   try {
      const entry = await Entry.findById(req.params.id);
      if (!entry) {
         return res.status(404).json({ error: 'Entry not found' });
      }
      const likeIndex = entry.likes.indexOf(req.user.id);
      if (likeIndex !== -1) {
         entry.likes.splice(likeIndex, 1);
      } else {
         entry.likes.push(req.user.id);
      }
      await entry.save();
      res.status(200).json({ entry });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
}


module.exports = { createEntry, getUserEntries, deleteEntry, updateEntry, getAllEntries, getLastEntriesByLimit, getEntryById, likeEntry };