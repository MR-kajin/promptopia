import '@styles/globals.css'

import Nav from '@components/Nav'

export const metadata = {
    title: "Promptopia",
    description: 'Discover & Share AI Prompts'
}

{/*Remember that next/auth does not use only fronend auth but also backend so we need API */}

const RootLayout = ({children})  => {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className="app">
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;