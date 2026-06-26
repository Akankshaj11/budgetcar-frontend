import React, { useRef, useEffect, useState } from "react";

// Procedurally generate a 3D Car Mesh
// Returns { vertices: [{x,y,z}], faces: [[v0,v1,v2,v3, type]] }
// Types: 0=body, 1=glass, 2=wheel, 3=light, 4=grill/dark
const generateCarMesh = (carType, primaryColor) => {
    const vertices = [];
    const faces = [];

    // Helper to add vertex and return its index
    const addV = (x, y, z) => {
        vertices.push({ x, y, z });
        return vertices.length - 1;
    };

    // Helper to add quad face
    const addQuad = (v0, v1, v2, v3, type, colorOverride = null) => {
        faces.push({ indices: [v0, v1, v2, v3], type, color: colorOverride });
    };

    // Helper to add triangle face
    const addTri = (v0, v1, v2, type, colorOverride = null) => {
        faces.push({ indices: [v0, v1, v2], type, color: colorOverride });
    };

    // Define dimensions based on car type
    let w = 0.9;  // half width
    let h1 = -0.3; // ground clearance/bottom
    let h2 = 0.0;  // beltline/hood
    let h3 = 0.35; // roof height
    let l_front = 1.8; // front bumper Z
    let l_hood = 1.0;  // front windshield base Z
    let l_windshield = 0.5; // front roof start Z
    let l_rear = -1.8; // rear bumper Z
    let l_cabin_rear = -1.0; // rear windshield base Z
    let l_roof_rear = -0.6; // rear roof end Z

    if (carType === "sports") {
        w = 0.92;
        h3 = 0.3;
        l_front = 1.7;
        l_hood = 0.9;
        l_windshield = 0.4;
        l_roof_rear = -0.8;
    } else if (carType === "supercar") {
        w = 0.96;
        h3 = 0.22;
        h1 = -0.33;
        h2 = -0.05;
        l_front = 1.9;
        l_hood = 0.8;
        l_windshield = 0.3;
        l_roof_rear = -0.9;
    } else if (carType === "suv") {
        w = 0.95;
        h3 = 0.55;
        h1 = -0.2;
        h2 = 0.15;
        l_front = 1.7;
        l_hood = 1.1;
        l_windshield = 0.8;
        l_roof_rear = -1.4;
        l_cabin_rear = -1.5;
    }

    // Build vertices structure: Left side (negative X) and Right side (positive X)
    // Indexes:
    // We will define points at key longitudinal stations (Z values)
    // For each Z station, we define 4 points:
    // Bottom (b), Belt (bl), Roof (r) on Left (L) and Right (R)
    
    const stations = [
        { z: l_rear, label: "rear" },          // Z = l_rear (Bumper)
        { z: l_cabin_rear, label: "cabin_r" }, // Z = cabin rear
        { z: l_roof_rear, label: "roof_r" },   // Z = roof end
        { z: 0.0, label: "center" },           // Z = center
        { z: l_windshield, label: "roof_f" },  // Z = windshield top (roof start)
        { z: l_hood, label: "hood" },          // Z = hood start (windshield base)
        { z: l_front, label: "front" }         // Z = l_front (Bumper)
    ];

    const nodes = {}; // key: station_side_level -> index

    stations.forEach((st, sIdx) => {
        const z = st.z;
        const s = st.label;

        // Custom heights/widths for styling
        let curW = w;
        let curRoofW = w * 0.65;
        let curB = h1;
        let curBelt = h2;
        let curRoof = h3;

        if (s === "front" || s === "rear") {
            curW = w * 0.8;
            curBelt = h2 - 0.1;
            curRoof = curBelt; // No roof at front/rear bumpers
        } else if (s === "hood") {
            curW = w * 0.88;
            curBelt = h2;
            curRoof = curBelt; // Windshield base height
        } else if (s === "cabin_r") {
            curW = w * 0.92;
            curBelt = h2 + 0.02;
            curRoof = curBelt; // Windshield base rear height
        } else if (s === "roof_r" || s === "roof_f" || s === "center") {
            curW = w;
            curB = h1;
            curBelt = h2;
            curRoof = h3;
            if (carType === "sports" && s === "roof_r") {
                curRoof = h3 - 0.05; // sloping sports back
            }
            if (carType === "supercar" && s === "roof_r") {
                curRoof = h3 - 0.08; // heavy wedge sloping back
            }
        }

        // Add Left points (x is negative)
        nodes[`${s}_L_bot`] = addV(-curW, curB, z);
        nodes[`${s}_L_belt`] = addV(-curW, curBelt, z);
        nodes[`${s}_L_roof`] = addV(-curRoofW, curRoof, z);

        // Add Right points (x is positive)
        nodes[`${s}_R_bot`] = addV(curW, curB, z);
        nodes[`${s}_R_belt`] = addV(curW, curBelt, z);
        nodes[`${s}_R_roof`] = addV(curRoofW, curRoof, z);
    });

    // --- FACES CREATION ---
    // Station Indices helper
    const buildSection = (s1, s2, hasRoof) => {
        // Lower side panels
        addQuad(nodes[`${s1}_L_bot`], nodes[`${s2}_L_bot`], nodes[`${s2}_L_belt`], nodes[`${s1}_L_belt`], 0);
        addQuad(nodes[`${s1}_R_belt`], nodes[`${s2}_R_belt`], nodes[`${s2}_R_bot`], nodes[`${s1}_R_bot`], 0);

        // Underbody floor
        addQuad(nodes[`${s1}_L_bot`], nodes[`${s1}_R_bot`], nodes[`${s2}_R_bot`], nodes[`${s2}_L_bot`], 4);

        if (hasRoof) {
            // Upper side panels (Windows)
            addQuad(nodes[`${s1}_L_belt`], nodes[`${s2}_L_belt`], nodes[`${s2}_L_roof`], nodes[`${s1}_L_roof`], 1);
            addQuad(nodes[`${s1}_R_roof`], nodes[`${s2}_R_roof`], nodes[`${s2}_R_belt`], nodes[`${s1}_R_belt`], 1);

            // Roof panel
            addQuad(nodes[`${s1}_L_roof`], nodes[`${s1}_R_roof`], nodes[`${s2}_R_roof`], nodes[`${s2}_L_roof`], 0);
        } else {
            // Hood or Trunk panels (deck lid)
            addQuad(nodes[`${s1}_L_belt`], nodes[`${s1}_R_belt`], nodes[`${s2}_R_belt`], nodes[`${s2}_L_belt`], 0);
        }
    };

    // 1. Rear Bumper to Cabin Rear (Trunk Deck)
    buildSection("rear", "cabin_r", false);

    // 2. Cabin Rear to Roof Rear (Rear Windshield)
    // This is a transition from flat trunk to roof height
    addQuad(nodes["cabin_r_L_belt"], nodes["cabin_r_R_belt"], nodes["roof_r_R_roof"], nodes["roof_r_L_roof"], 1); // Glass
    // Side triangle/quad fillers for the C-pillar
    addQuad(nodes["cabin_r_L_bot"], nodes["roof_r_L_bot"], nodes["roof_r_L_belt"], nodes["cabin_r_L_belt"], 0);
    addQuad(nodes["roof_r_R_belt"], nodes["roof_r_R_bot"], nodes["cabin_r_R_bot"], nodes["cabin_r_R_belt"], 0);
    addTri(nodes["cabin_r_L_belt"], nodes["roof_r_L_belt"], nodes["roof_r_L_roof"], 0);
    addTri(nodes["roof_r_R_roof"], nodes["roof_r_R_belt"], nodes["cabin_r_R_belt"], 0);

    // 3. Cabin Middle sections (Roof and side windows)
    buildSection("roof_r", "center", true);
    buildSection("center", "roof_f", true);

    // 4. Roof Front to Hood (Front Windshield Glass)
    addQuad(nodes["roof_f_L_roof"], nodes["roof_f_R_roof"], nodes["hood_R_belt"], nodes["hood_L_belt"], 1); // Glass
    // A-pillar side panels
    addQuad(nodes["roof_f_L_bot"], nodes["hood_L_bot"], nodes["hood_L_belt"], nodes["roof_f_L_belt"], 0);
    addQuad(nodes["hood_R_belt"], nodes["hood_R_bot"], nodes["roof_f_R_bot"], nodes["roof_f_R_belt"], 0);
    addTri(nodes["roof_f_L_belt"], nodes["hood_L_belt"], nodes["roof_f_L_roof"], 0);
    addTri(nodes["roof_f_R_roof"], nodes["hood_R_belt"], nodes["roof_f_R_belt"], 0);

    // 5. Hood to Front Bumper
    buildSection("hood", "front", false);

    // 6. Caps (Front Grille and Rear Bumper faces)
    // Front Grille/Lights
    addQuad(nodes["front_L_bot"], nodes["front_R_bot"], nodes["front_R_belt"], nodes["front_L_belt"], 4); // Dark Grille
    // Lights on front corners (simplistic representation)
    addTri(nodes["front_L_belt"], nodes["front_L_bot"], nodes["hood_L_belt"], 3); // Front Left Headlight
    addTri(nodes["front_R_bot"], nodes["front_R_belt"], nodes["hood_R_belt"], 3); // Front Right Headlight

    // Rear bumper end face
    addQuad(nodes["rear_R_bot"], nodes["rear_L_bot"], nodes["rear_L_belt"], nodes["rear_R_belt"], 4); // Rear bumper back
    // Taillights
    addTri(nodes["rear_L_belt"], nodes["rear_L_bot"], nodes["cabin_r_L_belt"], 3, "#ef4444"); // Red Taillight Left
    addTri(nodes["rear_R_bot"], nodes["rear_R_belt"], nodes["cabin_r_R_belt"], 3, "#ef4444"); // Red Taillight Right

    // --- WHEELS GENERATION ---
    // Add wheels at standard wheel arches
    const wheelZPos = [1.1, -1.1]; // Front and rear axles Z
    const wheelXPos = [w + 0.05, -w - 0.05]; // Right and Left track width
    const wheelRadius = 0.32;
    const wheelWidth = 0.22;

    wheelZPos.forEach((wz) => {
        wheelXPos.forEach((wx) => {
            const isRight = wx > 0;
            // Generate 8-segment cylinder for wheel
            const segments = 12;
            const wVIndices = [];

            for (let i = 0; i < segments; i++) {
                const angle = (i * Math.PI * 2) / segments;
                const dy = Math.cos(angle) * wheelRadius;
                const dz = Math.sin(angle) * wheelRadius;

                // Wheel hub position
                const wy = h1 + 0.15; // axle height

                // Inner and outer face vertices
                const vInner = addV(wx - (isRight ? wheelWidth : -wheelWidth), wy + dy, wz + dz);
                const vOuter = addV(wx, wy + dy, wz + dz);
                wVIndices.push({ inner: vInner, outer: vOuter });
            }

            // Connect wheel cylinder faces
            for (let i = 0; i < segments; i++) {
                const next = (i + 1) % segments;
                // Outer circle face (disc)
                addQuad(
                    wVIndices[isRight ? i : next].outer,
                    wVIndices[isRight ? next : i].outer,
                    vertices.length - 1, // center placeholder - actually just use triangles/quads
                    vertices.length - 1, // center placeholder
                    2,
                    "#222222" // Dark grey tread
                );

                // Cylinder tread face
                addQuad(
                    wVIndices[i].inner,
                    wVIndices[next].inner,
                    wVIndices[next].outer,
                    wVIndices[i].outer,
                    2,
                    "#111111" // Tread
                );
            }
            
            // Add a simple center cap
            const wheelCenter = addV(wx, h1 + 0.15, wz);
            for (let i = 0; i < segments; i++) {
                const next = (i + 1) % segments;
                addTri(
                    wVIndices[isRight ? next : i].outer,
                    wVIndices[isRight ? i : next].outer,
                    wheelCenter,
                    4, // Chrome hub cap
                    "#78716c"
                );
            }
        });
    });

    return { vertices, faces };
};

const ThreeSixtyCarCanvas = ({ carType, primaryColor, onInteractionStart, onInteractionEnd }) => {
    const canvasRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    
    // Rotation state
    const rotation = useRef({ yaw: -0.6, pitch: 0.18 });
    const dragStart = useRef({ x: 0, y: 0 });
    const velocity = useRef({ yaw: 0.005, pitch: 0 });
    const lastTime = useRef(0);
    const animationFrameId = useRef(null);
    const interactionTimeout = useRef(null);
    const activeMesh = useRef(null);

    // Regenerate mesh when carType or primaryColor changes
    useEffect(() => {
        activeMesh.current = generateCarMesh(carType, primaryColor);
    }, [carType, primaryColor]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Auto resize canvas
        const handleResize = () => {
            const rect = canvas.parentNode.getBoundingClientRect();
            canvas.width = rect.width * window.devicePixelRatio;
            canvas.height = rect.height * window.devicePixelRatio;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        // Rendering engine
        const render = (time) => {
            if (!canvas || !activeMesh.current) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const wWidth = canvas.width;
            const wHeight = canvas.height;
            ctx.clearRect(0, 0, wWidth, wHeight);

            // Shading Light Source Direction (front-top-right)
            const lightDir = { x: 0.8, y: 1.0, z: 0.6 };
            const lightLen = Math.sqrt(lightDir.x ** 2 + lightDir.y ** 2 + lightDir.z ** 2);
            lightDir.x /= lightLen;
            lightDir.y /= lightLen;
            lightDir.z /= lightLen;

            // Physics Update (Momentum & Friction)
            if (!isDragging) {
                // Apply friction
                velocity.current.yaw *= 0.95;
                velocity.current.pitch *= 0.95;

                // Slow auto-spin when completely idle
                if (Math.abs(velocity.current.yaw) < 0.0005) {
                    velocity.current.yaw = 0.0015;
                }

                rotation.current.yaw += velocity.current.yaw;
                rotation.current.pitch += velocity.current.pitch;

                // Snap pitch back to reasonable viewing angles
                const targetPitch = 0.18;
                rotation.current.pitch += (targetPitch - rotation.current.pitch) * 0.05;
            }

            // View Math Matrix
            const cy = Math.cos(rotation.current.yaw);
            const sy = Math.sin(rotation.current.yaw);
            const cp = Math.cos(rotation.current.pitch);
            const sp = Math.sin(rotation.current.pitch);

            // Camera Setup
            const cx = wWidth / 2;
            const cyCenter = wHeight / 2 + 30; // slightly lower center for ground shadow feel
            const fov = Math.min(wWidth, wHeight) * 0.9;
            const cameraDist = 4.2;

            // Rotate and Project Vertices
            const { vertices, faces } = activeMesh.current;
            const projectedVertices = vertices.map((v) => {
                // Pitch (around X axis)
                const y1 = v.y * cp - v.z * sp;
                const z1 = v.y * sp + v.z * cp;

                // Yaw (around Y axis)
                const x2 = v.x * cy + z1 * sy;
                const z2 = -v.x * sy + z1 * cy;

                // Translate Z for camera
                const z3 = z2 + cameraDist;

                // Perspective projection
                const sx = cx + (x2 * fov) / z3;
                const sy = cyCenter - (y1 * fov) / z3;

                return { x: sx, y: sy, z: z3 };
            });

            // Calculate face depths and normals for sorting and backface culling
            const sortedFaces = faces
                .map((face, index) => {
                    const idxs = face.indices;
                    
                    // Simple Z depth as average of vertex Zs
                    let avgZ = 0;
                    idxs.forEach((i) => { avgZ += projectedVertices[i].z; });
                    avgZ /= idxs.length;

                    // Calculate normal vector of face in 3D (using original rotated vertices)
                    const v0 = vertices[idxs[0]];
                    const v1 = vertices[idxs[1]];
                    const v2 = vertices[idxs[2]];

                    // Unrotated normal for shading direction
                    const ux = v1.x - v0.x;
                    const uy = v1.y - v0.y;
                    const uz = v1.z - v0.z;
                    const vx = v2.x - v0.x;
                    const vy = v2.y - v0.y;
                    const vz = v2.z - v0.z;

                    let nx = uy * vz - uz * vy;
                    let ny = uz * vx - ux * vz;
                    let nz = ux * vy - uy * vx;
                    const len = Math.sqrt(nx**2 + ny**2 + nz**2);
                    nx /= len; ny /= len; nz /= len;

                    // Now calculate normal rotated in screen space
                    // We need it to determine if face is visible (culling)
                    const p0 = projectedVertices[idxs[0]];
                    const p1 = projectedVertices[idxs[1]];
                    const p2 = projectedVertices[idxs[2]];
                    
                    // Cross product in screen space (2D) to find winding order / facing camera
                    const facing = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);

                    return { face, avgZ, nx, ny, nz, facing, index };
                })
                // Culling back-facing polygons (facing > 0 means counter-clockwise winding, away from camera)
                .filter(f => f.facing <= 0)
                // Painter's sorting: furthest faces rendered first
                .sort((a, b) => b.avgZ - a.avgZ);

            // Draw soft dynamic ground glow/shadow beneath the car
            const shadowGrad = ctx.createRadialGradient(cx, cyCenter + fov*0.08, 10, cx, cyCenter + fov*0.08, fov*0.48);
            shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.65)");
            shadowGrad.addColorStop(0.3, "rgba(0, 0, 0, 0.4)");
            shadowGrad.addColorStop(0.7, primaryColor + "15"); // Subtle theme accent glow
            shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

            ctx.save();
            ctx.scale(1.8, 0.35); // flatten circle into ellipse
            ctx.fillStyle = shadowGrad;
            ctx.beginPath();
            ctx.arc(cx / 1.8, (cyCenter + fov*0.075) / 0.35, fov * 0.28, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // Render polygons
            sortedFaces.forEach(({ face, nx, ny, nz }) => {
                const idxs = face.indices;
                ctx.beginPath();
                ctx.moveTo(projectedVertices[idxs[0]].x, projectedVertices[idxs[0]].y);
                for (let i = 1; i < idxs.length; i++) {
                    ctx.lineTo(projectedVertices[idxs[i]].x, projectedVertices[idxs[i]].y);
                }
                ctx.closePath();

                // Lighting Calculations
                // Cosine angle between face normal and light source
                // Rotate normal by current yaw/pitch for shading
                // normal rotation:
                const rny1 = ny * cp - nz * sp;
                const rnz1 = ny * sp + nz * cp;
                const rnx = nx * cy + rnz1 * sy;
                const rnz = -nx * sy + rnz1 * cy;

                const dot = Math.max(0, rnx * lightDir.x + rny1 * lightDir.y + rnz * lightDir.z);

                // Ambient light
                const ambient = 0.25;
                // Specular reflection (shiny highlight)
                // Halfway vector approximation
                const specPower = 20;
                const spec = Math.pow(dot, specPower) * 0.3;

                // Base Colors based on face types
                let baseColor = primaryColor; // Default body
                if (face.type === 1) { // Glass
                    baseColor = "#1e293b";
                } else if (face.type === 2) { // Tires
                    baseColor = "#18181b";
                } else if (face.type === 3) { // Lights
                    baseColor = "#fef08a"; // yellow glow
                } else if (face.type === 4) { // Grille/Axle
                    baseColor = "#27272a";
                }

                // If face has explicit color override
                if (face.color) {
                    baseColor = face.color;
                }

                // Parse baseColor
                let r = 80, g = 80, b = 80;
                if (baseColor.startsWith("#")) {
                    const val = parseInt(baseColor.slice(1), 16);
                    if (baseColor.length === 4) {
                        r = ((val >> 8) & 0xf) * 17;
                        g = ((val >> 4) & 0xf) * 17;
                        b = (val & 0xf) * 17;
                    } else {
                        r = (val >> 16) & 0xff;
                        g = (val >> 8) & 0xff;
                        b = val & 0xff;
                    }
                } else if (baseColor.startsWith("rgba")) {
                    const match = baseColor.match(/[\d.]+/g);
                    if (match) {
                        r = parseInt(match[0]);
                        g = parseInt(match[1]);
                        b = parseInt(match[2]);
                    }
                }

                // Apply lighting to RGB channels
                const litR = Math.min(255, Math.floor(r * (ambient + dot * 0.7) + spec * 255));
                const litG = Math.min(255, Math.floor(g * (ambient + dot * 0.7) + spec * 255));
                const litB = Math.min(255, Math.floor(b * (ambient + dot * 0.7) + spec * 255));
                const alpha = face.type === 1 ? 0.75 : 1.0; // semi-transparent windows

                ctx.fillStyle = `rgba(${litR}, ${litG}, ${litB}, ${alpha})`;
                ctx.fill();

                // Draw thin edges/wireframe outlines for clean premium cad style
                ctx.strokeStyle = `rgba(${litR + 30}, ${litG + 30}, ${litB + 30}, 0.25)`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            });

            animationFrameId.current = requestAnimationFrame(render);
        };

        animationFrameId.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [isDragging]);

    // Handle mouse/touch drag handlers
    const startDrag = (clientX, clientY) => {
        setIsDragging(true);
        dragStart.current = { x: clientX, y: clientY };
        velocity.current = { yaw: 0, pitch: 0 };
        
        // Notify parent to stop slide interval
        if (onInteractionStart) {
            onInteractionStart();
        }
        
        if (interactionTimeout.current) {
            clearTimeout(interactionTimeout.current);
        }
    };

    const handleDrag = (clientX, clientY) => {
        if (!isDragging) return;
        const dx = clientX - dragStart.current.x;
        const dy = clientY - dragStart.current.y;

        // Scale factors for rotation speed
        const sensitivity = 0.007;

        rotation.current.yaw += dx * sensitivity;
        
        // constrain pitch to not invert the car
        const nextPitch = rotation.current.pitch + dy * sensitivity;
        rotation.current.pitch = Math.max(-0.2, Math.min(0.5, nextPitch));

        dragStart.current = { x: clientX, y: clientY };

        // Set velocity for momentum
        velocity.current.yaw = dx * sensitivity;
        velocity.current.pitch = dy * sensitivity;
    };

    const endDrag = () => {
        setIsDragging(false);
        // Start timeout to resume slideshow
        if (interactionTimeout.current) {
            clearTimeout(interactionTimeout.current);
        }
        interactionTimeout.current = setTimeout(() => {
            if (onInteractionEnd) {
                onInteractionEnd();
            }
        }, 5000); // 5 seconds of inactivity before slideshow resumes
    };

    // Event listeners
    const onMouseDown = (e) => {
        startDrag(e.clientX, e.clientY);
    };

    const onMouseMove = (e) => {
        handleDrag(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
        endDrag();
    };

    const onTouchStart = (e) => {
        if (e.touches.length === 1) {
            startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const onTouchMove = (e) => {
        if (e.touches.length === 1) {
            handleDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    };

    const onTouchEnd = () => {
        endDrag();
    };

    return (
        <div 
            className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <canvas 
                ref={canvasRef} 
                className="w-full h-full block" 
            />
            {/* Guide overlay */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 backdrop-blur-md text-white/70 text-xs px-3 py-1.5 rounded-full pointer-events-none select-none tracking-wider font-medium flex items-center gap-2">
                <span>🔄 DRAG TO ROTATE 360°</span>
            </div>
        </div>
    );
};

export default ThreeSixtyCarCanvas;
