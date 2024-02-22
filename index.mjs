#!/usr/bin/env node

import { createProject } from "./src/project-creator.mjs";

(async () => {
    await createProject();
})();
