#!/usr/bin/env bash
set -e

# ----------------------------
# Default values
# ----------------------------
FEATURE_BRANCH_NAME=$(git branch --show-current)
PR_TITLE=""
PR_BODY=""
BASE_BRANCH="devel"

# ----------------------------
# Help
# ----------------------------
usage() {
  echo "Usage: $0 -t <title> [-b <body>]"
  echo
  echo "Options:"
  echo "  -t, --title          Pull request title"
  echo "  -b, --body           Pull request body/description (optional)"
  exit 1
}

# ----------------------------
# Parse arguments
# ----------------------------
while [[ $# -gt 0 ]]; do
  case $1 in
    -t|--title)
      PR_TITLE="$2"
      shift 2
      ;;
    -b|--body)
      PR_BODY="$2"
      shift 2
      ;;
    -*|--*)
      echo "Unknown option $1"
      usage
      ;;
    *)
      shift
      ;;
  esac
done

# ----------------------------
# Validate arguments
# ----------------------------
if [[ -z "$FEATURE_BRANCH_NAME" ]] || [[ -z "$PR_TITLE" ]]; then
  echo "Error: feature-name and title are required."
  usage
fi

# ----------------------------
# Make sure feature branch exists
# ----------------------------
if ! git rev-parse --verify "$FEATURE_BRANCH_NAME" >/dev/null 2>&1; then
    echo "Error: local branch '$FEATURE_BRANCH_NAME' does not exist."
    exit 1
fi

if ! gh --version &> /dev/null; then
    echo "Error: Github CLI is not installed. If you are on mac, you can run: <brew install gh>"
    exit 1
fi

if ! gh auth status >/dev/null; then
    echo "Error: you are not logged into Github, please run: <gh auth login>."
    exit 1
fi

# ----------------------------
# Push branch to origin
# ----------------------------
echo "Pushing branch '$FEATURE_BRANCH_NAME' to origin..."
git push -u origin "$FEATURE_BRANCH_NAME"

# ----------------------------
# Create Pull Request
# ----------------------------
echo "Creating PR from '$FEATURE_BRANCH_NAME' into '$BASE_BRANCH'..."
gh pr create --base "$BASE_BRANCH" --head "$FEATURE_BRANCH_NAME" --title "$PR_TITLE" --body "$PR_BODY"

echo "PR created successfully!"