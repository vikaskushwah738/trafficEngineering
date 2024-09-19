"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd"; 
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
let delectInterval
export function ObjectDetection(net: unknown) {
    const [isloading, setLoading]=useState(true)
    const webcamRef = useRef<Webcam>(null);
    const runCoco = async ()=>{
        setLoading(true);
        const net = await cocoSSDLoad();
        setLoading(false);

        delectInterval =setInterval(() =>{
      //   runObjectDetection(net)
        },10)
    }

    const showmyVideo = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const myVideoWidth = webcamRef.current.video.videoWidth;
            const myVideoHeight = webcamRef.current.video.videoHeight;
            webcamRef.current.video.width =myVideoWidth;
            webcamRef.current.video.height =myVideoHeight;
        }
    };
    useEffect(() =>{
     runCoco();
     showmyVideo();
    },[])

    return (
        <div className="mt-8">
            {  isloading ? (
               <div className="gradient-text">Loadiing AI Model</div>
            ) :
            <div className="relative w-full flex justify-center items-center gradient rounded-md p-1.5">
                <Webcam
                    ref={webcamRef}
                    className="rounded-md w-full lg:h-[600px] "
                    muted
                />
                <canvas
                // ref={canvasRef}
                className="top-0 left-0 absolute z-9999 w-full lg:h[720px]"
                />
            </div>
           }
        </div>
    );
}
