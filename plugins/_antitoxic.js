
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe)
        return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    
    if (chat.antiToxic && !isAdmin) {
        if (isBotAdmin) {
            if (m.text.includes('Anjing', 'Bapakao', 'Tulul', 'Kontol', 'Asu', 'Anj', 'Ajg', 'Memek', 'Gblk', 'Tolol')) return !0
        }
        await conn.sendButton(m.chat, `*Kata Aneh Terdeteksi!*${isBotAdmin ? '' : '\n\n_Bot bukan admin_'}`, author, ['off antitoxic', '/disable antitoxic'], m)
        if (isBotAdmin && bot.restrict) {
            await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        } else if (!bot.restrict) return m.reply('Owner disable auto kick!')
    }
    return !0
}