function Git(name) {
  this.name = name; // Repo name
  this.lastCommitId = -1;
  this.HEAD = null; // Reference to last Commit.
}

// In real Git, Actual command:
// > git init
const repo = new Git('My-repo');

function Commit(id, parent, message) {
  this.id = id;
  this.parent = parent;
  // Assume that 'this' has a 'change' property too.
  this.message = message;
}

// Adding the ability on our Git class to create a commit
Git.prototype.commit = function (message) {
  const commit = new Commit(++this.lastCommitId, this.HEAD, message);
  // Update HEAD and current branch.
  this.HEAD = commit;
  return commit;
};

Git.prototype.log = function () {
  // array of commits in reverse order.
  // 1. Start from last commit
  // 2. Go back tracing to the first commit
  // 3. Push in `history`
  //   const history = [];
  //   return history;

  // Start from HEAD
  const commit = this.HEAD,
    history = [];
  while (commit) {
    history.push(commit);
    // Keep following the parent
    commit = commit.parent;
  }

  return history;
  // Can be used as repo.log();
  // Actual command:
  // > git log
};
