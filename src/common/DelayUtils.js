
export const delay = (execute, duration) => {
    new Promise((resolve => {
        setTimeout(resolve, duration)
    })).then(
        execute()
    )
}