const fromNow = (isoDate) => {
    const createdAt = new Date(isoDate)
    const now = new Date()
    const timeDiff = Math.abs(createdAt.getTime() - now.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // milliseconds in day
    return diffDays - 1;
}

const hash = (sha) => {
    return sha.substr(sha.length - 6)
}

const branch = (ref) => {
    return ref.replace('refs/heads/', '')
}

const daysAgo = (isoDate) => {
    const diff = fromNow(isoDate);
    const isPlural = diff > 1 ? "s" : "";
    return diff === 0 ? `today` : `${diff} day${isPlural} ago`;
}

export {
    daysAgo,
    hash,
    branch,
}