export default function actionsAction(node, actions) {
  const objects = []

  if (actions) {
    actions.forEach((item) => {
      const isArray = Array.isArray(item)
      const action = isArray ? item[0] : item
      if (isArray && item.length > 1) {
        objects.push(action(node, item[1]))
      } else {
        objects.push(action(node))
      }
    })
  }

  return {
    update(actions) {
      if (actions?.length !== objects.length) {
        throw new Error('You must not change the length of an actions array.')
      }

      if (actions) {
        actions.forEach((item, i) => {
          const isArray = Array.isArray(item)
          if (isArray && item.length > 1) {
            objects[i]?.update?.(item[1])
          } else {
            objects[i]?.update?.()
          }
        })
      }
    },
    destroy() {
      objects.forEach((obj) => obj?.destroy?.())
    }
  }
}
