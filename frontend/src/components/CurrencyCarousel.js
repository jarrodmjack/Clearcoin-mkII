import React from 'react'

const CurrencyCarousel = () => {
    return (
        <div className='bg-base-200'>
            <iframe
                src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover="
                width="100%"
                height="36px"
            >
            </iframe>
        </div>
    )
}

export default CurrencyCarousel