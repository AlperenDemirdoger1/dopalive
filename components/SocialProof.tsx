'use client';

const SocialProof = () => {
  const avatars = [
    { id: 1, gradient: 'from-pink-400 to-purple-400' },
    { id: 2, gradient: 'from-blue-400 to-cyan-400' },
    { id: 3, gradient: 'from-orange-400 to-pink-400' },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Avatar Group - 44px, overlap -10px */}
      <div className="flex items-center" style={{ marginRight: '-10px' }}>
        {avatars.map((avatar, index) => (
          <div
            key={avatar.id}
            className={`w-[44px] h-[44px] rounded-full border-[3px] border-white bg-gradient-to-br ${avatar.gradient} flex items-center justify-center shadow-md relative transition-transform duration-300 hover:scale-110`}
            style={{ zIndex: avatars.length - index, marginLeft: index === 0 ? '0' : '-10px' }}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm" />
          </div>
        ))}
      </div>

      {/* Text - 15px, gap 16px */}
      <span className="text-white/90 text-[15px] font-normal tracking-tight font-[var(--font-poppins)]" style={{ marginLeft: '16px' }}>
        7,000+ people already subscribed
      </span>
    </div>
  );
};

export default SocialProof;

