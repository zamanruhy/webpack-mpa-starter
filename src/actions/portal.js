export default function portalAction(node, parent) {
  parent = parent || document.body
  parent.appendChild(node)
}
