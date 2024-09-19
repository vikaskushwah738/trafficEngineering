"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // This registers the 'webgl' backend
import { renderPredictions } from "@/utility/render-prediction";

let detectInterval: NodeJS.Timeout;

export function ObjectDetection() {
    const [isLoading, setLoading] = useState(true);
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initialize TensorFlow backend and ensure it's ready
    const setupTfBackend = async () => {
        try {
            await tf.setBackend('webgl'); // Set the backend to 'webgl'
            await tf.ready(); // Wait for TensorFlow.js to be ready
        } catch (error) {
            console.error("Error setting TensorFlow backend:", error);
        }
    };

    const runCoco = async () => {
        setLoading(true);
        // Initialize the backend
        await setupTfBackend();
        // Load the COCO-SSD model
        const net = await cocoSSDLoad();
        setLoading(false);

        // Start object detection at intervals
        detectInterval = setInterval(() => {
            runObjectDetection(net);
        }, 10);
    };

    async function runObjectDetection(net: any) {
        if (
            canvasRef.current &&
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            const video = webcamRef.current.video as HTMLVideoElement;

            // Set canvas dimensions to match video
            canvasRef.current.width = video.videoWidth;
            canvasRef.current.height = video.videoHeight;

            // Detect objects in the video stream
            const detectObject = await net.detect(video, undefined, 0.6);

            const context = canvasRef.current.getContext("2d");
            if (context) {
                renderPredictions(detectObject, context);
            }
        }
    }

    const showMyVideo = () => {
        if (
            webcamRef.current !== null &&
            webcamRef.current.video?.readyState === 4
        ) {
            const video = webcamRef.current.video as HTMLVideoElement;
            video.width = video.videoWidth;
            video.height = video.videoHeight;
        }
    };

    useEffect(() => {
        runCoco();
        showMyVideo();

        // Cleanup interval on unmount
        return () => clearInterval(detectInterval);
    }, []);

    return (
        <div className="mt-8">
            {isLoading ? (
                <div className="gradient-text">Loading AI Model</div>
            ) : (
                <div
                    className="relative w-full flex justify-center items-center gradient
                  rounded-md p-1.5">
                    <Webcam
                        ref={webcamRef}
                        className="rounded-md w-full lg:h-[600px]"
                        muted
                    />
                    <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full lg:h-[720px] z-[9999]"
                    />
                </div>
            )}
        </div>
    );
}
