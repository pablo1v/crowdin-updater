const Emojis = require('../../utils/Emojis.js');
const logger = require('../../utils/logger.js');
const Guild = require('../../database/Schemas/Guild');

exports.run = async (client, message, args) => {
  function updateHour() {
    Guild.findOne({ _id: message.guild.id }, async (err, srv) => {
      const horas = srv.evento.horas - 1;
      const dias = srv.evento.dias - 1;

      if (srv.evento.horas === 0) {
        await Guild.findOneAndUpdate(
          { _id: message.guild.id },
          { $set: { 'evento.dias': dias, 'evento.horas': 24 } },
        );
      } else {
        message.channel
          .send(`${srv.evento.dias} dias - ${srv.evento.horas} horas`)
          .then(async () => {
            await Guild.findOneAndUpdate(
              { _id: message.guild.id },
              { $set: { 'evento.horas': horas } },
            );

            console.log(horas);
            console.log(dias);
          });
      }
    });
  }

  setInterval(updateHour, 10000);
};

exports.help = {
  name: 'test',
  aliases: ['tat'],
  category: 'Info',
  description: 'Testando',
};
