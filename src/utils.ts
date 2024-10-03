// Portions of this file are Copyright 2021 Google LLC, and licensed under GPL2+. See COPYING.

import { confirmDialog } from "primereact/confirmdialog";
import { State } from "./state/app-state";

export function mapObject(
  o: any,
  f: (key: string, value: any) => any,
  ifPred: (key: string) => boolean
) {
  const ret = [];
  for (const key of Object.keys(o)) {
    if (ifPred && !ifPred(key)) {
      continue;
    }
    ret.push(f(key, o[key]));
  }
  return ret;
}

type Killer = () => void;
export type AbortablePromise<T> = Promise<T> & { kill: Killer };
export function AbortablePromise<T>(
  f: (resolve: (result: T) => void, reject: (error: any) => void) => Killer
): AbortablePromise<T> {
  let kill: Killer;
  const promise = new Promise<T>((res, rej) => {
    kill = f(res, rej);
  });
  return Object.assign(promise, { kill: kill! });
}

// <T extends any[]>(...args: T)
export function turnIntoDelayableExecution<T extends any[], R>(
  delay: number,
  job: (...args: T) => AbortablePromise<R>
) {
  let pendingId: number | null;
  let runningJobKillSignal: (() => void) | null;

  return (...args: T) =>
    async ({
      now,
      callback,
    }: {
      now: boolean;
      callback: (result?: R, error?: any) => void;
    }) => {
      const doExecute = async () => {
        if (runningJobKillSignal) {
          runningJobKillSignal();
          runningJobKillSignal = null;
        }
        const abortablePromise = job(...args);
        runningJobKillSignal = abortablePromise.kill;
        try {
          callback(await abortablePromise);
        } catch (e) {
          callback(undefined, e);
        } finally {
          runningJobKillSignal = null;
        }
      };
      if (pendingId) {
        clearTimeout(pendingId);
        pendingId = null;
      }
      if (now) {
        doExecute();
      } else {
        pendingId = window.setTimeout(doExecute, delay);
      }
    };
}

export function validateStringEnum<T extends string>(
  s: T,
  values: T[],
  orElse: (s: string) => T = (s) => {
    throw new Error(
      `Unexpected value: ${s} (valid values: ${values.join(", ")})`
    );
  }
): T {
  return values.indexOf(s) < 0 ? orElse(s) : s;
}
export const validateBoolean = (
  s: boolean,
  orElse: () => boolean = () => false
) => (typeof s === "boolean" ? s : orElse());
export const validateString = (s: string, orElse: () => string = () => "") =>
  s != null && typeof s === "string" ? s : orElse();
export const validateArray = <T>(
  a: Array<T>,
  validateElement: (e: T) => T,
  orElse: () => T[] = () => []
) => {
  if (!(a instanceof Array)) return orElse();
  return a.map(validateElement);
};

export function formatBytes(n: number) {
  if (n < 1024) {
    return `${Math.floor(n)} bytes`;
  }
  n /= 1024;
  if (n < 1024) {
    return `${Math.floor(n * 10) / 10} kB`;
  }
  n /= 1024;
  return `${Math.floor(n * 10) / 10} MB`;
}

export function formatMillis(n: number) {
  if (n < 1000) return `${Math.floor(n)}ms`;

  return `${Math.floor(n / 100) / 10}sec`;
}

// https://medium.com/quick-code/100vh-problem-with-ios-safari-92ab23c852a8
export function registerCustomAppHeightCSSProperty() {
  const updateAppHeight = () => {
    document.documentElement.style.setProperty(
      "--app-height",
      `${window.innerHeight}px`
    );
  };
  window.addEventListener("resize", updateAppHeight);
  updateAppHeight();
}

// In PWA mode, persist files in LocalStorage instead of the hash fragment.
export const isInStandaloneMode =
  // true
  Boolean("standalone" in window.navigator && window.navigator.standalone);

// ------------------------------------------------------------------------

// ---------------
// truncate the string
export const truncateString = (str: string): string => {
  if (str.length <= 21) {
    return str;
  }

  return str.slice(0, 21) + "...";
};

// ---------------
// clean the code
export const cleanCode = (text: string): string => {
  if (text.toLowerCase().includes("sorry")) {
    return "404";
  }

  text = text.replace(/```openscad/g, "");
  text = text.replace(/```/g, "");
  return text;
};

// ---------------
// download output
export const downloadOutput = (state: State) => {
  if (!state.output) return;
  const sourcePathParts = state.params.sourcePath.split("/");
  const sourceFileName = sourcePathParts.slice(-1)[0];
  const fileName = [
    sourceFileName,
    state.output!.isPreview ? "preview.stl" : "render.stl",
  ].join(".");
  const doDownload = () => {
    const a = document.createElement("a");
    a.href = state.output!.stlFileURL;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (state.output.isPreview && state.params.source.indexOf("$preview") >= 0) {
    confirmDialog({
      message:
        "This model references the $preview variable but hasn't been rendered (F6), or its rendering is stale. You're about to download the preview result itself, which may not have the intended refinement of the render. Sure you want to proceed?",
      header: "Preview vs. Render",
      icon: "pi pi-exclamation-triangle",
      accept: doDownload,
      acceptLabel: `Download ${fileName}`,
      rejectLabel: "Cancel",
      // reject: () => {}
    });
  } else {
    doDownload();
  }
};

// ---------------
// get old prompts
export const getPromptHistory = (): string[] => {
  return JSON.parse(localStorage.getItem("prompts") || "[]");
};

// ---------------
// add prompts to history
export const addPromptToHistory = (prompt: string) => {
  const promptsHistory = getPromptHistory();
  localStorage.setItem("prompts", JSON.stringify([prompt, ...promptsHistory]));
};
