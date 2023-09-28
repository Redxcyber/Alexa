module.exports = {
  command: 'add',
  info: 'Adds user to group from entered number.',
  func: async (sock, msg, text) => {
    if (!text && !msg.replied) return await sock.editMessage(msg.key, '*Please enter a number with +country code to add!*');
    if (msg.replied) {
      let isParticipant = await msg.isParticipant(msg.chat, msg.replied.sender);
      if (isParticipant) return await sock.editMessage(msg.key, '*@' + msg.replied.sender + ' is already a participant of this group!*');
      await sock.groupParticipantsUpdate(msg.chat, [msg.replied.sender], 'add');
      return await sock.editMessage(msg.key, '*Successfully added!*');
    } else if (text) {
      if (!text.startsWith('+')) return await sock.editMessage(msg.key, '*Please enter a number with +country code!*\n\n*For Example:*\n*/add +91 xxxxx xxxxx*\n\n*/add +91 xxxxxxxxxx\n*/add +91xxxxxxxxxx*');
      text = (text.trim().replace('+', '')) + '@s.whatsapp.net';
      let isParticipant = await msg.isParticipant(msg.chat, text);
      if (isParticipant) return await sock.editMessage(msg.key, '*@' + text + ' is already a participant of this group!*');
      await sock.groupParticipantsUpdate(msg.chat, [text], 'add');
      return await sock.editMessage(msg.key, '*Successfully added!*');
    }
  }
};
