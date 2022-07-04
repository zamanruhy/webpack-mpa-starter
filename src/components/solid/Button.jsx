import { splitProps, mergeProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import Spinner from './Spinner.jsx'

export default function Button(props) {
  props = mergeProps({ as: 'button', size: 'md' }, props)
  const [, rest] = splitProps(props, [
    'class',
    'classList',
    'as',
    'variant',
    'size',
    'disabled',
    'loading',
    'spinner',
    'children',
    'href'
  ])

  return (
    <Dynamic
      component={props.as}
      class="relative inline-flex cursor-pointer items-center justify-center rounded text-center align-middle transition focus:outline-none"
      classList={{
        [props.class]: Boolean(props.class),
        ...props.classList,
        'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:ring focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 active:bg-indigo-600':
          props.variant === 'primary' && !props.disabled,
        'text-slate-500 bg-slate-300 pointer-events-none': props.disabled,
        'pointer-events-none': props.loading,
        'min-h-10 py-1 px-5 text-base [--spinner-size:22px]':
          props.size === 'md'
      }}
      href={props.disabled || props.loading ? null : props.href}
      disabled={props.disabled || props.loading}
      {...rest}
    >
      {props.loading ? (
        <>
          <span class="invisible contents">{props.children}</span>
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {props.spinner || <Spinner />}
          </span>
        </>
      ) : (
        props.children
      )}
    </Dynamic>
  )
}
