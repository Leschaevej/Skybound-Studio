"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import "./Carousel.scss";

type Project = {
    title: string;
    imageSrc: string;
    description?: string;
    technologies?: string[];
    githubLink?: string;
    liveLink?: string;
    pdfLink?: string;
};
type CarouselProps = {
    projects: Project[];
};
const Carousel: React.FC<CarouselProps> = ({ projects }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState<"left" | "right" | null>(null);
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const touchStartRef = useRef<number | null>(null);
    const touchEndRef = useRef<number | null>(null);
    const lastMoveTime = useRef<number>(0);
    const minSwipeDistance = 50;
    const handleAnimationEnd = () => {
        if (pendingIndex !== null) {
            setCurrentIndex(pendingIndex);
            setPendingIndex(null);
        }
        setIsAnimating(false);
        setAnimationDirection(null);
    };
    const handlePrevious = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection("right");
        setPendingIndex(currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    };
    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection("left");
        setPendingIndex(currentIndex === projects.length - 1 ? 0 : currentIndex + 1);
    };
    const handleDotClick = (index: number) => {
        if (index === currentIndex || isAnimating) return;
        setIsAnimating(true);
        setAnimationDirection(index > currentIndex ? "left" : "right");
        setPendingIndex(index);
    };
    const onTouchStart = (e: React.TouchEvent) => {
        touchEndRef.current = null;
        touchStartRef.current = e.targetTouches[0].clientX;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (isAnimating) return;
        const now = Date.now();
        if (now - lastMoveTime.current < 16) return;
        lastMoveTime.current = now;
        touchEndRef.current = e.targetTouches[0].clientX;
        if (touchStartRef.current !== null) {
            const diff = touchStartRef.current - e.targetTouches[0].clientX;
            setDragOffset(-diff);
        }
    };
    const onTouchEnd = () => {
        if (!touchStartRef.current || !touchEndRef.current || isAnimating) {
            setDragOffset(0);
            return;
        }
        const distance = touchStartRef.current - touchEndRef.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        setDragOffset(0);
        touchStartRef.current = null;
        touchEndRef.current = null;
        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        touchEndRef.current = null;
        touchStartRef.current = e.clientX;
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || isAnimating) return;
        const now = Date.now();
        if (now - lastMoveTime.current < 16) return;
        lastMoveTime.current = now;

        touchEndRef.current = e.clientX;
        if (touchStartRef.current !== null) {
            const diff = touchStartRef.current - e.clientX;
            setDragOffset(-diff);
        }
    };
    const onMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (!touchStartRef.current || !touchEndRef.current || isAnimating) {
            setDragOffset(0);
            return;
        }
        const distance = touchStartRef.current - touchEndRef.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        setDragOffset(0);
        touchStartRef.current = null;
        touchEndRef.current = null;
        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrevious();
        }
    };
    const onMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setDragOffset(0);
        }
    };
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            handlePrevious();
        } else if (e.key === "ArrowRight") {
            handleNext();
        }
    };
    const currentProject = projects[currentIndex];
    const nextIndex = animationDirection === "left"
        ? (currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
        : (currentIndex === 0 ? projects.length - 1 : currentIndex - 1);
    const nextProject = isAnimating ? projects[nextIndex] : null;
    const prevImageIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    const nextImageIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    const renderProject = (project: Project, index: number, animClass: string, direction?: number, onAnimEnd?: () => void) => {
        const baseTransform = direction ? `translateX(${direction * 150}%)` : '';
        const dragTransform = dragOffset !== 0 && !direction ? `translateX(${dragOffset}px)` : '';
        const transform = dragTransform || baseTransform;
        const opacity = direction ? 0 : (dragOffset !== 0 ? 1 - Math.abs(dragOffset) / 500 : 1);
        const style = {
            transform: transform || undefined,
            opacity,
            transition: dragOffset !== 0 ? 'none' : undefined
        };
        return (
            <div key={`project-${index}`} className={`content ${animClass}`} style={style} onAnimationEnd={onAnimEnd}>
                <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="image"
                >
                    <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                    />
                </a>
                <div className="info">
                    <div className="header">
                        <h3>{project.title}</h3>
                        <div className="number">
                            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </div>
                    </div>
                    <p className="description">
                        {project.description}
                    </p>
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="techs">
                            {project.technologies.map((tech, idx) => (
                                <span key={idx} className="tech">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link"
                            aria-label="Voir le projet en ligne"
                        >
                            <span>Voir le projet</span>
                        </a>
                </div>
            </div>
        );
    };
    return (
        <div className="carousel" tabIndex={0} onKeyDown={onKeyDown}>
            <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
                <Image
                    src={projects[prevImageIndex].imageSrc}
                    alt=""
                    width={1}
                    height={1}
                    priority
                />
                <Image
                    src={projects[nextImageIndex].imageSrc}
                    alt=""
                    width={1}
                    height={1}
                    priority
                />
            </div>
            <div
                className="wrapper"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
            >
                {renderProject(
                    currentProject,
                    currentIndex,
                    isAnimating ? "exit" : "",
                    isAnimating ? (animationDirection === "left" ? -1 : 1) : undefined
                )}
                {nextProject && renderProject(
                    nextProject,
                    nextIndex,
                    "enter",
                    animationDirection === "left" ? 1 : -1,
                    handleAnimationEnd
                )}
            </div>
            <div className="controls">
                <button
                    className="nav prev"
                    onClick={handlePrevious}
                    aria-label="Projet précédent"
                >
                    <FaChevronLeft />
                </button>
                <div className="dots">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === (isAnimating ? nextIndex : currentIndex) ? "active" : ""}`}
                            onClick={() => handleDotClick(index)}
                            aria-label={`Aller au projet ${index + 1}`}
                        />
                    ))}
                </div>
                <button
                    className="nav next"
                    onClick={handleNext}
                    aria-label="Projet suivant"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};
export default Carousel;
