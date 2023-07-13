const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => {
        const urlRegex = /(http|https):\/\/(\w+(-\w+)*\.)+[a-z]{2,}(\/+[\w\-._~:/?#[\]@!$&'()*+,;=]{1,})*/;
        return urlRegex.test(v);
      },
      message: 'Некорректная ссылка на изображение',
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректно введён email',
    },
    required: [true, 'Поле "email" должно быть заполнено'],
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
