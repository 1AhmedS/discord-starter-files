/** @type {import('commandkit').CommandData} */
const data = {
    name: 'بينج',
    description: 'البينج بونج!',
  };
  
  /** @param {import('commandkit').SlashCommandProps} param0 */
  function run({ interaction, client }) {
    interaction.reply(`:ping_pong: بونج! ${client.ws.ping}ms`);
  }
  
  /** @type {import('commandkit').CommandOptions} */
  const options = {};
  
  module.exports = { data, run, options };
  