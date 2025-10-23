// src/app/components/Postcard.js
import Image from 'next/image'

// ----- DATA KARTU (DUMMY) -----
export const cardData = [
  { to: 'Jane Doe', from: 'John Doe' },
  { to: 'Alex', from: 'Sarah' },
  { to: 'Mom', from: 'The Kids' },
  { to: 'Bestie', from: 'Your #1 Fan' },
  { to: 'Michael', from: 'Emily' },
  { to: 'Luna', from: 'Leo' },
]

// ----- KOMPONEN KARTU -----
// Tanda 'type' ( : { to: string; from: string } ) sudah dihapus
export function Postcard({ to, from }) {
  return (
    <div className="w-[350px] h-[177px] md:w-[481px] md:h-[243px] bg-card-border rounded-[20px] p-1.5 flex-shrink-0">
      <div className="w-full h-full bg-card-inner rounded-2xl p-4 md:p-6 flex flex-col justify-between relative font-pixel text-card-text text-base md:text-lg">
        <div className="absolute top-4 right-4 w-10 h-10 md:top-6 md:right-6 md:w-12 md:h-12 bg-card-border rounded-lg flex items-center justify-center p-1">
          <Image
            src="/pixel-flower.png" // Mengambil dari /public/pixel-flower.png
            alt="Pixel Flower"
            width={70}
            height={68}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <p>To: {to}</p>
          <p className="w-4/5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultricies eleifend risus non consectetur.
          </p>
        </div>
        <p className="self-end">-{from}</p>
      </div>
    </div>
  )
}