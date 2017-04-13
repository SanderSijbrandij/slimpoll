export const getTotalVotes = (polls) => {
  return polls.reduce((currp, nextp) => {
    return currp + getVotes(nextp.answers)
  }, 0)
}

export const getVotes = (answers) => {
  return answers.reduce((curr, next) => {
    return curr + next.voteCount
  }, 0)
}