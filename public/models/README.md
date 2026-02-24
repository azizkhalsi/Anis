# 3D Motor Model

Place your motor model file here:

- **Filename:** `3DModel.glb`
- **Format:** GLB (binary glTF)

The simulator will load this model when available. The rotating part will be detected automatically if any node is named with "rotor", "shaft", "axis", "armature", or "spin" (case-insensitive). Otherwise the whole model rotates.

If the file is missing or fails to load, the built-in procedural motor model is shown instead.
