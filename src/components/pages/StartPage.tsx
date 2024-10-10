import React, { FormEvent, useState } from 'react'
// components
import Logo from '../atoms/Logo'
import SendIcon from '../atoms/SendIcon'

// ------------------------------------------------------------

interface StartPageProps {
  handleRequest: (requestPrompt: string) => void
  setShowStartPage: React.Dispatch<React.SetStateAction<boolean>>
}

const buttons = ['A polyhedron', 'A mug', 'A table', 'A cube']
const buttonClass =
  'w-[49%] mx-[0.5%] bg-white text-[#667085] rounded-md border border-[#D0D5DD] text-left p-4 my-2 cursor-pointer hover:shadow duration-150'

// ------------------------------------------------------------

export function StartPage({
  handleRequest,
  setShowStartPage
}: StartPageProps) {
  // ----------------------
  const [prompt, setPrompt] = useState('') // prompt
  const handleSubmit = (p: string) => {
    if (!p) {
      return
    }

    handleRequest(p)
    setShowStartPage(false)
  }

  // ----------------------
  return (
    <div className='bg-white'>
      <div className='h-screen w-11/12 md:w-3/5 flex flex-col items-center mx-auto py-20'>
        {/* logo */}
        <div className='m-auto'>
          <Logo dark={true} />
        </div>
        <p className='mb-auto'>Can I help you make something?</p>

        {/* prompts */}
        <div className='flex flex-wrap w-full my-4'>
          {buttons?.map((text, index) => (
            <button
              onClick={() => {
                handleSubmit(text)
              }}
              className={buttonClass}
              key={`${text} ${index}`}
            >
              {text}
            </button>
          ))}
        </div>

        <form
          onSubmit={() => handleSubmit(prompt)}
          className='w-full relative'
        >
          {/* input */}
          <input
            placeholder='Write a prompt ...'
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(prompt)
              }
            }}
            className='w-full mx-[0.5%] rounded-[10px] border-2 border-black text-[#667085] p-4 focus:outline-none focus:shadow-none'
          />

          {/* send button */}
          <button
            className='absolute top-0 right-0 h-full px-2 flex items-center justify-center disabled:opacity-50 duration-150'
            disabled={!prompt}
            onClick={() => handleSubmit(prompt)}
          >
            <SendIcon dark />
          </button>
        </form>
      </div>
    </div>
  )
}
