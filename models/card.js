const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
  },
  link: {
    type: String,
    validate: {
      validator: (v) => {
        const urlRegex = /(http|https):\/\/(\w+(-\w+)*\.)+[a-z]{2,}(\/+[\w\-._~:/?#[\]@!$&'()*+,;=]{1,})*/;
        return urlRegex.test(v);
      },
      message: 'Некорректная ссылка на изображение',
    },
    required: [true, 'Поле "link" должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заполнено'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  creadtedAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
