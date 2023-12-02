(function () {
  /*
     Commit Class
     A single commit

     @param {number} id      ID of the commit
     @param {Commit} parent  Parent Commit
     @param {string} msg     Commit message
    */

  function Commit(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
  }

  // Git Class
  /*
    Represent a Git repository
    @param {string} name     name of repository
   */
  function Git(name) {
    this.name = name; // Repo name
    this.lastCommitId = -1; // Keep track of last commit
    this.HEAD = null; // Reference to last Commit
    this.branches = []; // List of all branches

    const master = new Branch('master', null); // null is passed as we don't have any commit yet.
    this.branches.push(master); // Store master branch.
    this.HEAD = master; // HEAD points to current branch.
  }

  function Branch(name, commit) {
    this.name = name;
    this.commit = commit;
  }

  /*
  * Make a commit
  @param {string} message      Commit message
  @return {Commit}             created Commit object
  */

  Git.prototype.commit = function (message) {
    // Increment last commit id and pass into new commit.
    const commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

    // Update HEAD and current branch.
    this.HEAD.commit = commit;
    return commit;
  };

  /*
  Log history
  @return {Array} Commits in reverse chronological order.
  */
  Git.prototype.log = function () {
    // Start from HEAD
    const commit = this.HEAD.commit,
      history = [];

    while (commit) {
      history.push(commit);
      // Keep following the parent
      commit = commit.parent;
    }

    return history;
  };

  Git.prototype.checkout = function (branchName) {
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
  };

  //Expose Git class on window.
  window.Git = Git;
});
