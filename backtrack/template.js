function backtrackTemplate(candidates, target, currentPath) {
  if (currentPath === target) {
    // update answer and/or end recursion
  }

  for (const candidate of candidates) {
    // if candidate is valid
    if (candidate) {
      currentPath.push(candidate);
      backtrack(candidates, target, currentPath);
      currentPath.pop();
    }
  }
}
