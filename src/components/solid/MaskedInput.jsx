import { splitProps, createEffect, createMemo, onCleanup } from 'solid-js'
import IMask from 'imask'
import Input from './Input.jsx'

export default function MaskedInput(props) {
  const [, rest] = splitProps(props, [
    ...MASK_OPTIONS_KEYS,
    'value',
    'unmask',
    'onAccept',
    'onComplete',
    'onInput',
    'ref'
  ])
  let ref
  let maskRef
  const maskOptions = createMemo(() => {
    return MASK_OPTIONS_KEYS.reduce(
      (acc, key) => (key in props ? { ...acc, [key]: props[key] } : acc),
      {}
    )
  })

  function getMaskValue() {
    if (props.unmask === 'typed') return maskRef.typedValue
    if (props.unmask) return maskRef.unmaskedValue
    return maskRef.value
  }

  function initMask() {
    maskRef = new IMask(ref, maskOptions())
      .on('accept', (e) => {
        props.onAccept?.(getMaskValue(), maskRef, e)
        props.onInput?.({
          target: { name: rest.name, value: getMaskValue() }
        })
      })
      .on('complete', (e) => {
        props.onComplete?.(getMaskValue(), maskRef, e)
      })
  }

  function destroyMask() {
    if (maskRef) {
      maskRef.destroy()
      maskRef = undefined
    }
  }

  createEffect(() => {
    const value = props.value ?? ''
    if (!maskRef) return (ref.value = value)
    if (props.unmask === 'typed') maskRef.typedValue = value
    else if (props.unmask) maskRef.unmaskedValue = value
    else maskRef.value = value
  })

  createEffect(() => {
    if (maskOptions().mask) {
      if (maskRef) {
        maskRef.updateOptions(maskOptions())
      } else {
        initMask()
      }
    } else {
      destroyMask()
    }
  })

  onCleanup(destroyMask)

  return (
    <Input
      ref={(node) => {
        ref = node
        props.ref?.(node)
      }}
      {...rest}
    />
  )
}

const MASK_OPTIONS_KEYS = [
  'mask',
  'prepare',
  'commit',
  'overwrite',
  'eager',
  'placeholderChar',
  'lazy',
  'definitions',
  'blocks',
  'pattern',
  'format',
  'parse',
  'autofix',
  'radix',
  'thousandsSeparator',
  'mapToRadix',
  'scale',
  'signed',
  'normalizeZeros',
  'padFractionalZeros',
  'min',
  'max',
  'dispatch'
]
