const fromNow = (isoDate = "2019-01-22T19:31:35Z") => {
    const createdAt = new Date(isoDate)
    const now = new Date()
    const timeDiff = Math.abs(createdAt.getTime() - now.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // milliseconds in day
    return diffDays
}

const hash = (sha) => {
    return sha.substr(sha.length - 6)
}

const branch = (ref) => {
    return ref.replace('refs/heads/', '')
}

export {
    fromNow,
    hash,
    branch,
}