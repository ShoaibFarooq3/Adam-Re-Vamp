import React, { useContext, useEffect, useState } from 'react'
// context
import { ModelContext } from '../contexts'
// components
import CustomizeIcon from '../atoms/CustomizeIcon'
// primereact
import { Dialog } from 'primereact/dialog'
// react slider
import ReactSlider from 'react-slider'
// lodash
import * as _ from 'lodash'
// ---------------------------------

interface Parameter {
  name: string
  value: number
  defaultValue: number
}

const extractParameters = (code: string): Parameter[] => {
  const paramRegex = /(\w+)\s*=\s*([\d.-]+)/g
  const parameters: Parameter[] = []
  let match

  while ((match = paramRegex.exec(code)) !== null) {
    const name = match[1]
    const value = parseFloat(match[2])
    const defaultValue = parseFloat(match[2])
    if (!isNaN(value)) {
      parameters.push({ name, value, defaultValue })
    }
  }

  return parameters
}

// ---------------------------------

const CustomizePanel = () => {
  // -------------------------------------
  // model context
  const model = useContext(ModelContext)
  if (!model) throw new Error('No model')
  const state = model.state

  // -------------------------------------
  const [showCustomizer, setShowCustomizer] = useState(false) // customizer display
  const [code, setCode] = useState('') // code
  const [parameters, setParameters] = useState<Parameter[]>([]) // extracted paramters

  // -------------------------------------
  // handle parameters change
  const handleParameterChange = (
    paramName: string,
    value: number
  ) => {
    const updatedParameters = parameters.map(param =>
      param.name === paramName ? { ...param, value } : param
    )
    setParameters(updatedParameters)

    // ppdate code with new parameter
    const updatedCode = code.replace(
      new RegExp(`${paramName}\\s*=\\s*([\\d.-]+)`),
      `${paramName} = ${value}`
    )
    setCode(updatedCode)
  }

  // -------------------------------------
  const isUpdated = state.params.source !== code
  // handle generate for new code
  const handleGenerate = () => {
    if (isUpdated) model.source = code
  }

  // -------------------------------------
  useEffect(() => {
    const handleData = () => {
      setCode(state.params.source)
      const params = extractParameters(state.params.source)
      setParameters(params)
    }

    handleData()
  }, [model, model.state.params.source])

  // ---------------------------------

  return (
    <div>
      <button
        onClick={() => setShowCustomizer(true)}
        className='flex items-center px-4 py-1 opacity-60 hover:opacity-100 disabled:opacity-40 duration-150 mx-auto mb-5 border border-[#D0D5DD] rounded-lg'
        disabled={!state?.output?.isPreview}
      >
        <CustomizeIcon />
        <span className='text-[#344054] ml-2'>Customize</span>
      </button>

      <Dialog
        header='Parameters'
        visible={showCustomizer}
        onHide={() => setShowCustomizer(false)}
        position='bottom-left'
        resizable={false}
        draggable={false}
        className='w-11/12 sm:max-w-[40vw] sm:min-w-[350px]'
      >
        {/* inputs for parameters */}
        <div className='flex flex-col gap-2 px-4'>
          {parameters?.map?.((param, index) => (
            <div
              key={`${param.name} ${index}`}
              className='my-2 flex items-end'
            >
              <label className='text-base font-medium min-w-[70px] md:min-w-[120px]'>
                {_.capitalize(_.lowerCase(param.name))}
              </label>

              <ReactSlider
                max={
                  Math.pow(10, param.defaultValue.toString().length) -
                  1
                }
                min={0}
                defaultValue={param.value}
                onChange={val =>
                  handleParameterChange(param.name, +val)
                }
                className='horizontal-slider flex-1 ml-4 h-10 flex items-end mb-2'
                thumbClassName='slider-thumb'
                trackClassName='slider-track'
                renderThumb={(props, state) => (
                  <div {...props}>
                    <div className='relative'>
                      <div className='absolute -top-[35px] text-xs bg-[#FFC9E366] py-1 px-2 rounded left-1/2 -translate-x-1/2 '>
                        {state.valueNow}
                        <div className='relative'>
                          <svg
                            className='absolute -bottom-[12px] left-1/2 -translate-x-1/2'
                            xmlns='http://www.w3.org/2000/svg'
                            width={17}
                            height={8}
                            fill='none'
                          >
                            <path
                              fill='#FFC9E3'
                              fillOpacity={0.4}
                              d='M16.5 0H.5l6.586 6.586a2 2 0 0 0 2.828 0L16.5 0Z'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
          ))}
        </div>

        {/* generate */}
        <button
          className='bg-[#FF2D92] text-white rounded-md h-fit py-1.5 px-5 flex items-center font-semibold hover:opacity-80 disabled:bg-gray-400 disabled:opacity-100 duration-200 ease-in-out mt-6 mx-auto'
          disabled={!isUpdated}
          onClick={handleGenerate}
        >
          Adjust
        </button>
      </Dialog>
    </div>
  )
}

export default React.memo(CustomizePanel)
