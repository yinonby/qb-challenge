#!/usr/bin/env bash
set -e

# ----------------------------
# Default values
# ----------------------------
FEATURE_NAME=""
PR_TITLE=""
PR_BODY=""
BASE_BRANCH="devel"

# ----------------------------
# Help
# ----------------------------
usage() {
  echo "Usage: $0 -f <feature-name> -t <title> [-b <body>]"
  echo
  echo "Options:"
  echo "  -f, --feature-name   Local feature branch name"
  echo "  -t, --title          Pull request title"
  echo "  -b, --body           Pull request body/description (optional)"
  exit 1
}

# ----------------------------
# Parse arguments
# ----------------------------
while [[ $# -gt 0 ]]; do
  case $1 in
    -f|--feature-name)
      FEATURE_NAME="$2"
      shift 2
      ;;
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
if [[ -z "$FEATURE_NAME" ]] || [[ -z "$PR_TITLE" ]]; then
  echo "Error: feature-name and title are required."
  usage
fi

# ----------------------------
# Make sure feature branch exists
# ----------------------------
if ! git rev-parse --verify "feature/$FEATURE_NAME" >/dev/null 2>&1; then
    echo "Error: local branch 'feature/$FEATURE_NAME' does not exist."
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
echo "Pushing branch 'feature/$FEATURE_NAME' to origin..."
git push -u origin "feature/$FEATURE_NAME"

# ----------------------------
# Create Pull Request
# ----------------------------
echo "Creating PR from 'feature/$FEATURE_NAME' into '$BASE_BRANCH'..."
gh pr create --base "$BASE_BRANCH" --head "feature/$FEATURE_NAME" --title "$PR_TITLE" --body "$PR_BODY"

echo "PR created successfully!"