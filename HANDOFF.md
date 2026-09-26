# Handoff to a local Claude Code session

This folder is the output of a cloud Claude Code session that could not reach
`EstuaryHub/estuary-hub-design` (its egress proxy allowlists repos per session).
Drop these files into the repo and a local session has everything it needs.

## Cloud session id

    c26c071d-f0b6-5cef-a7ef-fea81e9d421c

Try `claude --teleport c26c071d-f0b6-5cef-a7ef-fea81e9d421c` from inside a clean
checkout of the repo. Teleport requires the cloud session to have been working on
a branch pushed to that repo — this one was not in a git repo at all, so it may
refuse. If it does, use the files here instead; nothing is lost.

## What to do with these files

    docs/01-application-design.md
    docs/02-interface-design-brief.md
    docs/03-azure-platform-and-costs.md
    docs/04-open-questions.md
    CLAUDE.md          <- from CLAUDE.md in this folder

Then: `git switch -c docs/design-documents && git add docs CLAUDE.md && git commit`
