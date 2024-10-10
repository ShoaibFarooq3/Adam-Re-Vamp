import { CSSProperties, useContext } from 'react'
// context
import { ModelContext } from '../contexts'
// stl viewer
import { StlViewer } from 'react-stl-viewer'
// primereact
import { ColorPicker } from 'primereact/colorpicker'
// state
import { defaultModelColor } from '../../state/initial-state'
// utils
import { downloadOutput } from '../../utils'
// components
import SettingsMenu from '../SettingsMenu'
import DownloadIcon from '../atoms/DownloadIcon'

// ---------------------------------

interface ViewerPanelProps {
  className?: string
  style?: CSSProperties
}

// ---------------------------------

export default function ViewerPanel({
  className,
  style
}: ViewerPanelProps) {
  // ---------------------------------
  // model context
  const model = useContext(ModelContext)
  if (!model) throw new Error('No model')
  const state = model.state
  const lastPrompt = model?.state?.params?.lastPrompt || ''

  // ---------------------------------

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        position: 'relative',
        width: '100%',
        ...(style ?? {})
      }}
    >
      {state.output?.stlFileURL && (
        <StlViewer
          className='absolute-fill'
          style={{
            zIndex: 0
          }}
          showAxes={state.view.showAxes}
          orbitControls
          shadows={state.view.showShadows}
          modelProps={{
            color: model.state.view.color
          }}
          url={state.output?.stlFileURL ?? ''}
        />
      )}

      <div className='absolute top-4 right-4 z-30 flex gap-8'>
        {/* download button */}
        <button
          className='bg-[#FF2D92] text-white rounded-md h-fit py-1.5 px-5 flex items-center font-semibold hover:opacity-80 disabled:bg-gray-400 disabled:opacity-100 duration-200 ease-in-out'
          onClick={() => downloadOutput(state)}
          disabled={!state?.output?.isPreview}
        >
          <DownloadIcon /> &nbsp; Download
        </button>

        {/* settings button / color picker */}
        <div className='flex flex-col gap-8 mt-0.5'>
          <SettingsMenu />

          <ColorPicker
            value={model.state.view.color}
            onChange={e =>
              model.mutate(
                s =>
                  (s.view.color = `#${e.value ?? defaultModelColor}`)
              )
            }
          />
        </div>
      </div>

      {/* last prompt */}
      <div
        className={`absolute top-3/4 right-8 lg:right-16 z-30 ${
          !!lastPrompt ? 'opacity-100' : 'opacity-0'
        } duration-200 ease-in-out cursor-default`}
      >
        <p
          className={`max-w-[200px] bg-[#FF2D92] bg-opacity-10 text-sm md:text-base rounded-xl rounded-bl-none py-1 px-4`}
        >
          {lastPrompt}
        </p>
        <p className='text-gray-300 text-xs leading-none mt-0.5 select-none'>
          Your prompt
        </p>
      </div>
    </div>
  )
}
