function fromNow(isoDate) {
  const createdAt = new Date(isoDate)
  const now = new Date()
  const timeDiff = Math.abs(createdAt.getTime() - now.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) // milliseconds in day
  return diffDays - 1
}

function hash(sha) {
  return sha.substr(sha.length - 6)
}

function branch(ref) {
  return ref.replace("refs/heads/", "")
}

function daysAgo(isoDate) {
  const diff = fromNow(isoDate)
  const isPlural = diff > 1 ? "s" : ""
  return diff === 0 ? `today` : `${diff} day${isPlural} ago`
}

// @see https://davidwalsh.name/javascript-debounce-function

function debounce(fn, wait, immediate) {
  let timeout
  return () => {
    let delay = () => {
      timeout = null
      if (!immediate) {
        fn()
      }
    }
    let callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(delay, wait)
    if (callNow) {
      fn()
    }
  }
}

function getLink({ name }) {
  return `https://github.com/${name}`
}
export { daysAgo, debounce, getLink, hash, branch }
