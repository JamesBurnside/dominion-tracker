export type bump_type = 'major' | 'minor' | 'patch';

/// bumpString - Take a version string, bump it and return the new string
export function bumpString(versionString: string, bumpType: bump_type): string {
  const [majorStr, minorStr, patchStr] = versionString.split('.');
  if (!(majorStr && minorStr && patchStr)) {
    throw new Error(`Invalid verison string to bump: ${versionString}`);
  }

  let [major, minor, patch] = [
    parseInt(majorStr),
    parseInt(minorStr),
    parseInt(patchStr),
  ];
  if (isNaN(major) || isNaN(minor) || isNaN(patch)) {
    throw new Error(
      `Invalid verison numbers to bump. major: ${major}, minor: ${minor}, patch: ${patch}`
    );
  }

  switch (bumpType) {
    case 'major':
      major++;
      break;
    case 'minor':
      minor++;
      break;
    case 'patch':
      patch++;
      break;
  }

  return major + '.' + minor + '.' + patch;
}

// Check the bump type CLI arg is valid
export function verifyBumpType(bumpType: string): void {
  if (bumpType !== 'patch' && bumpType !== 'minor' && bumpType !== 'major') {
    throw new Error(`Unknown bump type: ${bumpType}`);
  } else {
    console.log(`Performing ${bumpType} bump.`);
  }
}
