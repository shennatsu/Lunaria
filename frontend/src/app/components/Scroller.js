// src/app/components/Scroller.js
import { Postcard, cardData } from './Postcard' // <-- Import dari file sebelah

// ----- KOMPONEN SCROLLER -----
// Tanda 'type' sudah dihapus
export function PostcardScroller({ direction = 'left' }) {
  const scrollAnimation =
    direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'

  const repeatedData = cardData.concat(cardData)

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)] md:[mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul
        className={`flex items-center justify-center md:justify-start [&_li]:mx-2 md:[&_li]:mx-4 ${scrollAnimation}`}
      >
        {repeatedData.map((card, index) => (
          <li key={index}>
            <Postcard to={card.to} from={card.from} />
          </li>
        ))}
      </ul>
    </div>
  )
}