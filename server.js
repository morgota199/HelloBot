const Bot = require("node-telegram-bot-api");
const config = require("./config");
const key = require("./keybutton/replykeybutton");

const bot = new Bot(config.TOKEN,  {polling: true});
//433875594
bot.on('message', (msg) => {
    // if(msg.new_chat_participant){
    //     let re_name = new RegExp("{name}", 'g');
    //     let re_user_id = new RegExp("{name}", 'g');
    //     let for_replace = "[{name}](tg://user?id={user_id})".replace();
    //     let message = config.TEXT_HELLO.replace(re, msg.new_chat_participant.first_name);
    //     let parse_mode = 'Markdown';
    //     bot.sendMessage(msg.chat.id, message, parse_mode);
    // }
    if(msg.new_chat_participant){
        let for_replace = '[{name}](tg://user?id={user_id})';
        let re_name = new RegExp("{name}", 'g');
        let re_user_id = new RegExp("{user_id}", 'g');
        for_replace = for_replace.replace(re_name, for_replace);
        for_replace = for_replace.replace(re_name, msg.new_chat_participant.first_name);
        for_replace = for_replace.replace(re_user_id, msg.new_chat_participant.id);
        console.log(for_replace);
        let parse_mode = 'Markdown';
        bot.sendMessage(msg.chat.id, message, parse_mode);
    }
});

bot.on('message', (msg) => {
    if(msg.text == "Редактировать приветствие" && config.ADMIN_STATE == 0){
        bot.sendMessage(config.ADMIN, "Пришлите текст приветствия");
        config.ADMIN_STATE = 1;
    }
});

bot.on('message', (msg) => {
    if(config.ADMIN_STATE == 1 && msg.text != "Редактировать приветствие"){
        config.TEXT_HELLO = msg.text;
        bot.sendMessage(config.ADMIN, "Сохранено");
        config.ADMIN_STATE = 0;
    }
});

bot.on('message', (msg) => {
    if(msg.text == "/start" && msg.from.id == config.ADMIN){
        bot.sendMessage(msg.chat.id, "Привет \n Я бот для приветствий", key.Reply);
        console.log(msg);
    }
});