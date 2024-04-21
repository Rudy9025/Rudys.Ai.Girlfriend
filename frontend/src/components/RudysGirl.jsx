import React, { useRef, useEffect, useContext } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { AnimationContext } from "./AnimationContext";
 
 
export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/RudysGirl.glb");
  const { actions } = useAnimations(animations, group);
  const { currentAnimation, playAnimation } = useContext(AnimationContext);
  const stopAllAnimations = () => {
    Object.values(actions).forEach((action) => action.stop());
  };
   useEffect(() => {
      actions.Idle.play();
      if (currentAnimation) {
      stopAllAnimations();
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);


 

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Ch02_Body"
            geometry={nodes.Ch02_Body.geometry}
            material={materials.Ch02_body}
            skeleton={nodes.Ch02_Body.skeleton}
          />
          <skinnedMesh
            name="Ch02_Cloth"
            geometry={nodes.Ch02_Cloth.geometry}
            material={materials.Ch02_body}
            skeleton={nodes.Ch02_Cloth.skeleton}
          />
          <skinnedMesh
            name="Ch02_Eyelashes"
            geometry={nodes.Ch02_Eyelashes.geometry}
            material={materials.Ch02_hair}
            skeleton={nodes.Ch02_Eyelashes.skeleton}
          />
          <skinnedMesh
            name="Ch02_Hair"
            geometry={nodes.Ch02_Hair.geometry}
            material={materials.Ch02_hair}
            skeleton={nodes.Ch02_Hair.skeleton}
          />
          <skinnedMesh
            name="Ch02_Sneakers"
            geometry={nodes.Ch02_Sneakers.geometry}
            material={materials.Ch02_body}
            skeleton={nodes.Ch02_Sneakers.skeleton}
          />
          <skinnedMesh
            name="Ch02_Socks"
            geometry={nodes.Ch02_Socks.geometry}
            material={materials.Ch02_body}
            skeleton={nodes.Ch02_Socks.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/RudysGirl.glb");
