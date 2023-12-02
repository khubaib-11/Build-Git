class Commit {
  constructor(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
  }
}

class Git {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1; // Keep track of last commit
    this.HEAD = null; // Reference to last Commit
    this.branches = []; // List of all branches

    const master = new Branch('master', null); // null is passed as we don't have any commit yet.
    this.branches.push(master); // Store master branch.
    this.HEAD = master; // HEAD points to current branch.
  }

  commit(message) {
    // Increment last commit id and pass into new commit.
    const commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

    // Update HEAD and current branch.
    this.HEAD.commit = commit;
    return commit;
  }

  log() {
    // Start from HEAD
    const commit = this.HEAD.commit,
      history = [];

    while (commit) {
      history.push(commit);
      // Keep following the parent
      commit = commit.parent;
    }

    return history;
  }

  checkout(branchName) {
    // Check if a branch already exists with name = branchName
    for (let i = this.branches.length; i--; ) {
      // We found an existing branch
      console.log('Switched to existing branch: ' + branchName);
      this.HEAD = this.branches[i];
      return this;
    }

    // We reach here when no matching branch is found. create a new one.
    const newBranch = new Branch(branchName, this.HEAD.commit);

    // Store branch
    this.branches.push(newBranch);

    // Update HEAD
    this.HEAD = newBranch;
    console.log('Switched to new branch: ' + branchName);
    return this;
  }
}

class Branch {
  constructor(name, commit) {
    this.name = name;
    this.commit = commit;
  }
}
