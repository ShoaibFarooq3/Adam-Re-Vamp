import OpenAI from 'openai'
import { API_KEY, GPT_MODEL, SYSTEM_PROMPT } from '../config'

const MODEL = GPT_MODEL
const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
})

// open ai completions
export const fetchCode = async (prompt: string) => {
  let MESSAGES = [
    {
      role: 'system' as const,
      content: SYSTEM_PROMPT
    },
    {
      role: 'user' as const,
      content: `Generate OpenSCAD 3d shape code for ${prompt.trim()}.`
    }
  ]

  const completions = await openai.chat.completions.create({
    messages: MESSAGES,
    model: MODEL,
    temperature: 0.1
  })

  return completions?.choices?.[0]?.message?.content
}
