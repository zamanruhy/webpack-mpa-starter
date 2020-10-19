export default function portal(node, parent) {
  parent = parent || document.body
  parent.appendChild(node)
}
