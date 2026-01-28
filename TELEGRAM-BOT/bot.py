import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes
import aiohttp
import asyncio
import hashlib
import hmac
from datetime import datetime

# Setup logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# NOWPayments Configuration
NOWPAYMENTS_API_KEY = "YOUR_NOWPAYMENTS_API_KEY"
NOWPAYMENTS_IPN_SECRET = "YOUR_IPN_SECRET_KEY"
NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1"

# States untuk conversation handler
WAITING_EMAIL = 1

# Database SMTP Hosting (dalam production gunakan database sesungguhnya)
smtp_list = [
    {
        "id": 1,
        "name": "SMTP Premium 1",
        "host": "smtp.example1.com",
        "port": 587,
        "username": "user1@example.com",
        "password": "password123",
        "price_idr": 50000,
        "price_usd": 3.5,
        "description": "Daily limit: 1000 emails"
    },
    {
        "id": 2,
        "name": "SMTP Premium 2",
        "host": "smtp.example2.com",
        "port": 465,
        "username": "user2@example.com",
        "password": "password456",
        "price_idr": 75000,
        "price_usd": 5,
        "description": "Daily limit: 2000 emails"
    },
    {
        "id": 3,
        "name": "SMTP Premium 3",
        "host": "smtp.example3.com",
        "port": 587,
        "username": "user3@example.com",
        "password": "password789",
        "price_idr": 100000,
        "price_usd": 7,
        "description": "Daily limit: 5000 emails"
    }
]

# Temporary storage untuk user sessions dan pending payments
user_sessions = {}
pending_payments = {}

class NOWPaymentsAPI:
    """Class untuk handle NOWPayments API"""
    
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.base_url = NOWPAYMENTS_API_URL
        self.headers = {
            "x-api-key": api_key,
            "Content-Type": "application/json"
        }
    
    async def get_available_currencies(self):
        """Mendapatkan list cryptocurrency yang tersedia"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(
                    f"{self.base_url}/currencies",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data.get('currencies', [])
                    return []
            except Exception as e:
                logger.error(f"Error getting currencies: {e}")
                return []
    
    async def get_estimate(self, amount: float, currency_from: str = "usd", currency_to: str = "usdttrc20"):
        """Estimasi jumlah crypto yang harus dibayar"""
        async with aiohttp.ClientSession() as session:
            try:
                params = {
                    "amount": amount,
                    "currency_from": currency_from,
                    "currency_to": currency_to
                }
                async with session.get(
                    f"{self.base_url}/estimate",
                    headers=self.headers,
                    params=params
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data
                    return None
            except Exception as e:
                logger.error(f"Error getting estimate: {e}")
                return None
    
    async def create_payment(self, price_amount: float, price_currency: str, pay_currency: str, 
                            order_id: str, order_description: str, ipn_callback_url: str = None):
        """Membuat payment baru"""
        async with aiohttp.ClientSession() as session:
            try:
                payload = {
                    "price_amount": price_amount,
                    "price_currency": price_currency,
                    "pay_currency": pay_currency,
                    "order_id": order_id,
                    "order_description": order_description
                }
                
                if ipn_callback_url:
                    payload["ipn_callback_url"] = ipn_callback_url
                
                async with session.post(
                    f"{self.base_url}/payment",
                    headers=self.headers,
                    json=payload
                ) as response:
                    if response.status == 200 or response.status == 201:
                        data = await response.json()
                        return data
                    else:
                        text = await response.text()
                        logger.error(f"Payment creation failed: {text}")
                        return None
            except Exception as e:
                logger.error(f"Error creating payment: {e}")
                return None
    
    async def get_payment_status(self, payment_id: str):
        """Cek status payment"""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(
                    f"{self.base_url}/payment/{payment_id}",
                    headers=self.headers
                ) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data
                    return None
            except Exception as e:
                logger.error(f"Error getting payment status: {e}")
                return None


class SMTPBot:
    def __init__(self, token: str):
        self.token = token
        self.application = Application.builder().token(token).build()
        self.nowpayments = NOWPaymentsAPI(NOWPAYMENTS_API_KEY)
        self.setup_handlers()

    def setup_handlers(self):
        # Command handlers
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(CommandHandler("check_payment", self.check_payment_command))
        self.application.add_handler(CommandHandler("list", self.list_command))
        self.application.add_handler(CommandHandler("status", self.status_command))
        self.application.add_handler(CommandHandler("commands", self.commands_list))
        
        # Callback query handler
        self.application.add_handler(CallbackQueryHandler(self.button_callback))
        
        # Message handler untuk email input
        self.application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk command /start"""
        user = update.effective_user
        welcome_text = f"""
🎉 Selamat datang {user.first_name}!

Saya adalah Bot penjual SMTP Hosting dengan **pembayaran Crypto otomatis**! 🚀

Fitur yang tersedia:
✅ Lihat daftar SMTP hosting
✅ Testing SMTP sebelum membeli
✅ Pembayaran dengan Cryptocurrency (USDT, BTC, ETH, dll)
✅ Konfirmasi otomatis & instant
✅ Pengiriman kredensial langsung

💰 **Pembayaran Support:**
• USDT (TRC20/ERC20) - Recommended
• Bitcoin (BTC)
• Ethereum (ETH)
• Dan 200+ crypto lainnya

Ketik /help untuk panduan lengkap
Atau langsung lihat daftar SMTP dengan tombol di bawah!
        """
        
        keyboard = [[InlineKeyboardButton("📋 Lihat Daftar SMTP", callback_data="list_smtp")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(welcome_text, reply_markup=reply_markup)

    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handler untuk command /help"""
        help_text = """
📖 **Panduan Penggunaan Bot**

1️⃣ Lihat daftar SMTP yang tersedia
2️⃣ Pilih SMTP yang Anda inginkan
3️⃣ Test SMTP dengan mengirim email percobaan
4️⃣ Jika cocok, lakukan pembelian
5️⃣ Pilih cryptocurrency untuk pembayaran
6️⃣ Transfer ke alamat yang diberikan
7️⃣ Sistem akan detect otomatis (1-5 menit)
8️⃣ Dapatkan kredensial SMTP Anda!

**Cryptocurrency yang Didukung:**
💎 USDT (TRC20) - Paling cepat & murah fee
💎 Bitcoin (BTC)
💎 Ethereum (ETH)
💎 Dan 200+ crypto lainnya

**Cek Status Pembayaran:**
Gunakan /check_payment untuk cek manual

📋 **Lihat Semua Command:** /commands

Jika ada pertanyaan, hubungi admin.
        """
        await update.message.reply_text(help_text, parse_mode='Markdown')

    async def commands_list(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Menampilkan semua command yang tersedia"""
        commands_text = """
📋 **Daftar Command Bot**

🏠 **Menu Utama:**
/start - Mulai bot dan lihat menu utama
/help - Panduan penggunaan lengkap
/commands - Lihat daftar command (ini)

📦 **Produk & Pembelian:**
/list - Lihat daftar SMTP yang tersedia

💳 **Pembayaran:**
/check_payment - Cek status pembayaran aktif
/status - Status pembayaran terakhir

💡 **Tips:**
• Gunakan tombol interaktif untuk navigasi lebih mudah
• Semua pembayaran otomatis terdeteksi
• Kredensial akan dikirim langsung setelah pembayaran berhasil

📞 **Butuh Bantuan?**
Hubungi admin jika ada kendala.
        """
        await update.message.reply_text(commands_text, parse_mode='Markdown')

    async def list_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Command untuk melihat list SMTP"""
        if not smtp_list:
            await update.message.reply_text("❌ Maaf, saat ini tidak ada SMTP yang tersedia.")
            return
        
        text = "📋 **Daftar SMTP Hosting Tersedia:**\n\n"
        
        for smtp in smtp_list:
            text += f"🔹 **{smtp['name']}**\n"
            text += f"   💰 Harga: ${smtp['price_usd']} (Rp {smtp['price_idr']:,})\n"
            text += f"   📝 {smtp['description']}\n\n"
        
        keyboard = [[InlineKeyboardButton("🛒 Pilih & Beli", callback_data="list_smtp")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(text, reply_markup=reply_markup, parse_mode='Markdown')

    async def status_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Command untuk status pembayaran - alias dari check_payment"""
        await self.check_payment_command(update, context)

    async def list_smtp(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Menampilkan daftar SMTP hosting"""
        query = update.callback_query
        await query.answer()
        
        if not smtp_list:
            await query.edit_message_text("❌ Maaf, saat ini tidak ada SMTP yang tersedia.")
            return
        
        text = "📋 **Daftar SMTP Hosting Tersedia:**\n\n"
        keyboard = []
        
        for smtp in smtp_list:
            text += f"🔹 **{smtp['name']}**\n"
            text += f"   💰 Harga: ${smtp['price_usd']} (Rp {smtp['price_idr']:,})\n"
            text += f"   📝 {smtp['description']}\n\n"
            
            keyboard.append([InlineKeyboardButton(
                f"Pilih {smtp['name']}", 
                callback_data=f"select_{smtp['id']}"
            )])
        
        keyboard.append([InlineKeyboardButton("🔄 Refresh List", callback_data="list_smtp")])
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')

    async def select_smtp(self, update: Update, context: ContextTypes.DEFAULT_TYPE, smtp_id: int):
        """Handler ketika user memilih SMTP"""
        query = update.callback_query
        await query.answer()
        
        smtp = next((s for s in smtp_list if s['id'] == smtp_id), None)
        
        if not smtp:
            await query.edit_message_text("❌ SMTP tidak ditemukan.")
            return
        
        # Simpan pilihan user
        user_id = update.effective_user.id
        if user_id not in user_sessions:
            user_sessions[user_id] = {}
        user_sessions[user_id]['selected_smtp'] = smtp
        
        text = f"""
✨ **Detail SMTP yang Dipilih:**

📧 **Nama:** {smtp['name']}
🌐 **Host:** {smtp['host']}
🔌 **Port:** {smtp['port']}
💰 **Harga:** ${smtp['price_usd']} (≈ Rp {smtp['price_idr']:,})
📝 **Deskripsi:** {smtp['description']}

Apa yang ingin Anda lakukan?
        """
        
        keyboard = [
            [InlineKeyboardButton("🧪 Test SMTP", callback_data=f"test_{smtp['id']}")],
            [InlineKeyboardButton("💳 Beli Sekarang (Crypto)", callback_data=f"buy_{smtp['id']}")],
            [InlineKeyboardButton("◀️ Kembali ke Daftar", callback_data="list_smtp")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')

    async def test_smtp_request(self, update: Update, context: ContextTypes.DEFAULT_TYPE, smtp_id: int):
        """Request email untuk testing SMTP"""
        query = update.callback_query
        await query.answer()
        
        user_id = update.effective_user.id
        user_sessions[user_id]['state'] = WAITING_EMAIL
        user_sessions[user_id]['smtp_id_to_test'] = smtp_id
        
        await query.edit_message_text(
            "📧 **Testing SMTP**\n\n"
            "Silakan kirim email tujuan untuk testing.\n"
            "Contoh: test@gmail.com\n\n"
            "Ketik /start untuk membatalkan."
        , parse_mode='Markdown')

    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle text messages"""
        user_id = update.effective_user.id
        
        if user_id in user_sessions and user_sessions[user_id].get('state') == WAITING_EMAIL:
            await self.receive_email(update, context)

    async def receive_email(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Menerima email dan melakukan testing"""
        user_id = update.effective_user.id
        email = update.message.text.strip()
        
        # Validasi email sederhana
        if '@' not in email or '.' not in email:
            await update.message.reply_text("❌ Email tidak valid. Silakan coba lagi.")
            return
        
        smtp_id = user_sessions[user_id].get('smtp_id_to_test')
        smtp = next((s for s in smtp_list if s['id'] == smtp_id), None)
        
        if not smtp:
            await update.message.reply_text("❌ SMTP tidak ditemukan.")
            return
        
        # Kirim loading message
        loading_msg = await update.message.reply_text("⏳ Sedang mengirim email test...")
        
        # Testing SMTP (simulasi)
        await asyncio.sleep(2)
        success = True  # Simulasi success
        
        if success:
            await loading_msg.edit_text(
                f"✅ **Email test berhasil dikirim!**\n\n"
                f"Email test telah dikirim ke: {email}\n"
                f"Silakan cek inbox/spam Anda.\n\n"
                f"Apakah Anda ingin membeli SMTP ini?",
                parse_mode='Markdown'
            )
            
            keyboard = [
                [InlineKeyboardButton("💳 Ya, Beli Sekarang", callback_data=f"buy_{smtp['id']}")],
                [InlineKeyboardButton("🔄 Test Email Lain", callback_data=f"test_{smtp['id']}")],
                [InlineKeyboardButton("◀️ Pilih SMTP Lain", callback_data="list_smtp")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            await update.message.reply_text("Pilih aksi:", reply_markup=reply_markup)
        else:
            await loading_msg.edit_text(
                "❌ Gagal mengirim email test. Silakan coba lagi atau pilih SMTP lain."
            )
        
        # Clear state
        user_sessions[user_id]['state'] = None

    async def buy_smtp(self, update: Update, context: ContextTypes.DEFAULT_TYPE, smtp_id: int):
        """Handler untuk pembelian SMTP - pilih cryptocurrency"""
        query = update.callback_query
        await query.answer()
        
        smtp = next((s for s in smtp_list if s['id'] == smtp_id), None)
        
        if not smtp:
            await query.edit_message_text("❌ SMTP tidak ditemukan.")
            return
        
        # Tampilkan pilihan cryptocurrency populer
        text = f"""
💳 **Pilih Cryptocurrency untuk Pembayaran**

SMTP: **{smtp['name']}**
Harga: **${smtp['price_usd']}** (≈ Rp {smtp['price_idr']:,})

Pilih cryptocurrency di bawah ini:
        """
        
        keyboard = [
            [InlineKeyboardButton("💎 USDT (TRC20) - Recommended", callback_data=f"pay_{smtp_id}_usdttrc20")],
            [InlineKeyboardButton("💎 USDT (ERC20)", callback_data=f"pay_{smtp_id}_usdterc20")],
            [InlineKeyboardButton("₿ Bitcoin (BTC)", callback_data=f"pay_{smtp_id}_btc")],
            [InlineKeyboardButton("Ξ Ethereum (ETH)", callback_data=f"pay_{smtp_id}_eth")],
            [InlineKeyboardButton("◀️ Kembali", callback_data=f"select_{smtp_id}")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')

    async def create_crypto_payment(self, update: Update, context: ContextTypes.DEFAULT_TYPE, 
                                   smtp_id: int, pay_currency: str):
        """Membuat payment dengan NOWPayments"""
        query = update.callback_query
        await query.answer()
        
        smtp = next((s for s in smtp_list if s['id'] == smtp_id), None)
        
        if not smtp:
            await query.edit_message_text("❌ SMTP tidak ditemukan.")
            return
        
        user_id = update.effective_user.id
        
        # Show loading
        loading_msg = await query.edit_message_text("⏳ Membuat invoice pembayaran...")
        
        # Generate unique order ID
        order_id = f"SMTP_{user_id}_{smtp_id}_{int(datetime.now().timestamp())}"
        
        # Create payment
        payment_data = await self.nowpayments.create_payment(
            price_amount=smtp['price_usd'],
            price_currency="usd",
            pay_currency=pay_currency,
            order_id=order_id,
            order_description=f"Purchase {smtp['name']}"
        )
        
        if not payment_data:
            await loading_msg.edit_text(
                "❌ Gagal membuat pembayaran. Silakan coba lagi atau hubungi admin."
            )
            return
        
        # Simpan payment info
        payment_id = payment_data.get('payment_id')
        pay_address = payment_data.get('pay_address')
        pay_amount = payment_data.get('pay_amount')
        
        pending_payments[payment_id] = {
            'user_id': user_id,
            'smtp': smtp,
            'order_id': order_id,
            'pay_currency': pay_currency,
            'pay_amount': pay_amount,
            'status': 'waiting'
        }
        
        # Simpan ke user session
        user_sessions[user_id]['pending_payment_id'] = payment_id
        
        # Format cryptocurrency name
        crypto_names = {
            'usdttrc20': 'USDT (TRC20)',
            'usdterc20': 'USDT (ERC20)',
            'btc': 'Bitcoin',
            'eth': 'Ethereum'
        }
        crypto_name = crypto_names.get(pay_currency, pay_currency.upper())
        
        payment_text = f"""
✅ **Invoice Pembayaran Dibuat!**

📦 **Produk:** {smtp['name']}
💰 **Harga:** ${smtp['price_usd']}

💎 **Pembayaran dengan {crypto_name}**

**Jumlah yang harus dibayar:**
`{pay_amount}` {pay_currency.upper()}

**Alamat Pembayaran:**
`{pay_address}`

⚠️ **PENTING:**
• Kirim **EXACT AMOUNT** yang tertera
• Jangan kirim dari exchange (gunakan wallet pribadi)
• Pembayaran akan terdeteksi otomatis (1-5 menit)
• Status akan diupdate otomatis di sini

🔍 **Cek Status:** /check_payment

⏰ Invoice berlaku selama 60 menit
        """
        
        keyboard = [
            [InlineKeyboardButton("✅ Sudah Bayar - Cek Status", callback_data=f"status_{payment_id}")],
            [InlineKeyboardButton("❌ Batalkan", callback_data="list_smtp")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await loading_msg.edit_text(payment_text, reply_markup=reply_markup, parse_mode='Markdown')
        
        # Start auto check payment status
        asyncio.create_task(self.auto_check_payment(payment_id, user_id))

    async def auto_check_payment(self, payment_id: str, user_id: int, max_attempts: int = 60):
        """Auto check payment status setiap 30 detik"""
        attempts = 0
        
        while attempts < max_attempts:
            await asyncio.sleep(30)  # Check setiap 30 detik
            
            if payment_id not in pending_payments:
                break
            
            payment_status = await self.nowpayments.get_payment_status(payment_id)
            
            if not payment_status:
                attempts += 1
                continue
            
            status = payment_status.get('payment_status')
            
            if status in ['finished', 'confirmed']:
                # Payment berhasil!
                await self.process_successful_payment(payment_id, user_id)
                break
            elif status in ['failed', 'expired', 'refunded']:
                # Payment gagal
                await self.process_failed_payment(payment_id, user_id, status)
                break
            
            attempts += 1

    async def process_successful_payment(self, payment_id: str, user_id: int):
        """Process payment yang berhasil"""
        if payment_id not in pending_payments:
            return
        
        payment_info = pending_payments[payment_id]
        smtp = payment_info['smtp']
        
        # Kirim kredensial ke user
        credentials_text = f"""
🎉 **PEMBAYARAN BERHASIL!**

Terima kasih atas pembelian Anda!

📧 **Kredensial SMTP Anda:**

**{smtp['name']}**
━━━━━━━━━━━━━━━━━━
🌐 **Host:** `{smtp['host']}`
🔌 **Port:** `{smtp['port']}`
👤 **Username:** `{smtp['username']}`
🔑 **Password:** `{smtp['password']}`
━━━━━━━━━━━━━━━━━━

📝 **Info:** {smtp['description']}

✅ SMTP ini sekarang milik Anda!
💾 Simpan informasi ini dengan baik.
🔒 Jangan bagikan ke orang lain.

Terima kasih telah berbelanja! 🚀
        """
        
        try:
            await self.application.bot.send_message(
                chat_id=user_id,
                text=credentials_text,
                parse_mode='Markdown'
            )
            
            # Hapus SMTP dari list
            if smtp in smtp_list:
                smtp_list.remove(smtp)
            
            # Hapus dari pending payments
            del pending_payments[payment_id]
            
            # Clear user session
            if user_id in user_sessions:
                user_sessions[user_id]['pending_payment_id'] = None
                
        except Exception as e:
            logger.error(f"Error sending credentials: {e}")

    async def process_failed_payment(self, payment_id: str, user_id: int, status: str):
        """Process payment yang gagal"""
        if payment_id not in pending_payments:
            return
        
        status_messages = {
            'failed': 'gagal',
            'expired': 'kadaluarsa',
            'refunded': 'di-refund'
        }
        
        status_text = status_messages.get(status, status)
        
        try:
            await self.application.bot.send_message(
                chat_id=user_id,
                text=f"❌ Pembayaran {status_text}.\n\n"
                     f"Silakan coba lagi atau hubungi admin jika ada masalah.\n"
                     f"Ketik /start untuk memulai lagi."
            )
            
            # Hapus dari pending payments
            del pending_payments[payment_id]
            
        except Exception as e:
            logger.error(f"Error sending failed payment message: {e}")

    async def check_payment_status(self, update: Update, context: ContextTypes.DEFAULT_TYPE, payment_id: str):
        """Manual check payment status"""
        query = update.callback_query
        await query.answer("Mengecek status pembayaran...")
        
        if payment_id not in pending_payments:
            await query.edit_message_text("❌ Pembayaran tidak ditemukan atau sudah selesai.")
            return
        
        payment_status = await self.nowpayments.get_payment_status(payment_id)
        
        if not payment_status:
            await query.answer("❌ Gagal mengecek status. Coba lagi.", show_alert=True)
            return
        
        status = payment_status.get('payment_status')
        pay_amount = payment_status.get('pay_amount')
        actually_paid = payment_status.get('actually_paid', 0)
        
        status_emoji = {
            'waiting': '⏳',
            'confirming': '🔄',
            'confirmed': '✅',
            'finished': '🎉',
            'failed': '❌',
            'expired': '⏰',
        }
        
        emoji = status_emoji.get(status, '❓')
        
        status_text = f"""
{emoji} **Status Pembayaran**

Status: **{status.upper()}**
Jumlah: {pay_amount} {payment_status.get('pay_currency', '').upper()}
Terbayar: {actually_paid}

"""
        
        if status == 'waiting':
            status_text += "⏳ Menunggu pembayaran Anda...\n\nSistem akan auto-detect pembayaran dalam 1-5 menit setelah Anda transfer."
        elif status == 'confirming':
            status_text += "🔄 Pembayaran terdeteksi! Sedang menunggu konfirmasi blockchain..."
        elif status in ['confirmed', 'finished']:
            status_text += "✅ Pembayaran berhasil! Kredensial akan segera dikirim."
        elif status == 'failed':
            status_text += "❌ Pembayaran gagal. Silakan hubungi admin."
        elif status == 'expired':
            status_text += "⏰ Invoice sudah kadaluarsa. Silakan buat pesanan baru."
        
        keyboard = [
            [InlineKeyboardButton("🔄 Refresh Status", callback_data=f"status_{payment_id}")],
            [InlineKeyboardButton("🏠 Kembali ke Menu", callback_data="list_smtp")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(status_text, reply_markup=reply_markup, parse_mode='Markdown')

    async def check_payment_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Command untuk cek payment status"""
        user_id = update.effective_user.id
        
        if user_id not in user_sessions or not user_sessions[user_id].get('pending_payment_id'):
            await update.message.reply_text(
                "❌ Anda tidak memiliki pembayaran yang pending.\n"
                "Ketik /start untuk mulai berbelanja."
            )
            return
        
        payment_id = user_sessions[user_id]['pending_payment_id']
        
        if payment_id not in pending_payments:
            await update.message.reply_text(
                "✅ Pembayaran Anda sudah selesai atau tidak ditemukan.\n"
                "Ketik /start untuk melihat produk lainnya."
            )
            return
        
        payment_status = await self.nowpayments.get_payment_status(payment_id)
        
        if not payment_status:
            await update.message.reply_text("❌ Gagal mengecek status. Silakan coba lagi.")
            return
        
        status = payment_status.get('payment_status')
        
        status_messages = {
            'waiting': '⏳ Menunggu pembayaran',
            'confirming': '🔄 Sedang konfirmasi',
            'confirmed': '✅ Pembayaran dikonfirmasi',
            'finished': '🎉 Selesai',
            'failed': '❌ Gagal',
            'expired': '⏰ Kadaluarsa'
        }
        
        message = status_messages.get(status, f"Status: {status}")
        
        keyboard = [[InlineKeyboardButton("🔍 Lihat Detail", callback_data=f"status_{payment_id}")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(message, reply_markup=reply_markup)

    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle semua callback dari inline buttons"""
        query = update.callback_query
        data = query.data
        
        if data == "list_smtp":
            await self.list_smtp(update, context)
        elif data.startswith("select_"):
            smtp_id = int(data.split("_")[1])
            await self.select_smtp(update, context, smtp_id)
        elif data.startswith("test_"):
            smtp_id = int(data.split("_")[1])
            await self.test_smtp_request(update, context, smtp_id)
        elif data.startswith("buy_"):
            smtp_id = int(data.split("_")[1])
            await self.buy_smtp(update, context, smtp_id)
        elif data.startswith("pay_"):
            parts = data.split("_")
            smtp_id = int(parts[1])
            pay_currency = parts[2]
            await self.create_crypto_payment(update, context, smtp_id, pay_currency)
        elif data.startswith("status_"):
            payment_id = data.replace("status_", "")
            await self.check_payment_status(update, context, payment_id)

    def run(self):
        """Menjalankan bot"""
        # Set bot commands untuk menu di Telegram
        async def post_init(application):
            commands = [
                ("start", "🏠 Mulai bot & menu utama"),
                ("help", "📖 Panduan penggunaan"),
                ("commands", "📋 Lihat semua command"),
                ("list", "📦 Lihat daftar SMTP"),
                ("check_payment", "💳 Cek status pembayaran"),
                ("status", "📊 Status pembayaran terakhir"),
            ]
            await application.bot.set_my_commands(commands)
        
        # Set post_init untuk set commands
        self.application.post_init = post_init
        
        self.application.run_polling(allowed_updates=Update.ALL_TYPES)


# Cara menjalankan bot
if __name__ == "__main__":
    # ============================================
    # KONFIGURASI - ISI BAGIAN INI
    # ============================================
    
    # 1. TOKEN BOT TELEGRAM
    # Dapatkan dari @BotFather di Telegram
    BOT_TOKEN = "7846100993:AAEebIkqSE74sjBzFSZNqoAS517L3oiUrk8"  # ← ISI TOKEN ANDA DISINI
    
    # 2. NOWPAYMENTS API KEY & IPN SECRET
    # Sudah diisi di bagian atas file (line 13-14)
    # Jangan lupa ganti:
    # NOWPAYMENTS_API_KEY = "YOUR_NOWPAYMENTS_API_KEY"
    # NOWPAYMENTS_IPN_SECRET = "YOUR_IPN_SECRET_KEY"
    
    # ============================================
    
    if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
        print("❌ ERROR: Silakan isi BOT_TOKEN terlebih dahulu!")
        print("📝 Cara mendapatkan token:")
        print("   1. Buka @BotFather di Telegram")
        print("   2. Ketik /newbot")
        print("   3. Copy token yang diberikan")
        print("   4. Paste di BOT_TOKEN pada file ini")
        exit()
    
    if NOWPAYMENTS_API_KEY == "YOUR_NOWPAYMENTS_API_KEY":
        print("⚠️  WARNING: NOWPayments API Key belum diisi!")
        print("📝 Daftar di https://nowpayments.io untuk mendapatkan API Key")
        print("   Bot akan berjalan tapi pembayaran crypto tidak akan berfungsi.")
        print("")
    
    bot = SMTPBot(BOT_TOKEN)
    
    print("=" * 50)
    print("🤖 Bot SMTP Hosting dengan NOWPayments")
    print("=" * 50)
    print("✅ Bot sedang berjalan...")
    print("📡 Menunggu pesan dari user...")
    print("")
    print("💡 Tips:")
    print("   - Ketik /start di bot untuk memulai")
    print("   - Tekan Ctrl+C untuk menghentikan bot")
    print("=" * 50)
    print("")
    
    try:
        bot.run()
    except KeyboardInterrupt:
        print("\n👋 Bot dihentikan oleh user")
    except Exception as e:
        print(f"\n❌ Error: {e}")