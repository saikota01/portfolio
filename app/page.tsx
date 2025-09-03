"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Moon,
  Sun,
  Download,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Code,
  Server,
  Database,
  Cloud,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Calendar,
  MapPin,
  Building,
  Star,
  Award,
  Briefcase,
  ArrowUp,
} from "lucide-react"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"

function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transform-gpu z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      initial={{ scaleX: 0 }}
    />
  )
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 p-3 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-200" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neutral-600 dark:text-neutral-400" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-600 dark:text-neutral-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count}</span>
}

function Timeline() {
  const experiences = [
    {
      title: "Software Engineer 1",
      company: "MAQ Software",
      location: "Hyderabad, India",
      period: "Apr 2025 - Present",
      description:
        "As a Software Engineer I, I design, develop, and maintain scalable, cloud-native web applications and microservices using modern technologies such as .NET, Angular, and containerized deployments on Azure Kubernetes Service (AKS). I work closely with cross-functional teams to implement new features, optimize system performance, and ensure high code quality through best practices, code reviews, and automated CI/CD pipelines in Azure DevOps. I contribute to architectural discussions around distributed systems, leveraging Dapr for service-to-service communication, RabbitMQ for messaging, and Redis for state management. I actively participate in agile ceremonies, integrate observability solutions like AppDynamics, and implement secure runtime configurations using Azure Key Vault. Beyond development, I mentor junior developers, promote knowledge sharing within the team, and stay current with industry trends to continuously improve our engineering practices.",
      achievements: [
        "Eliminated year-old blockers by resolving critical legacy bugs across both development and DevOps pipelines, restoring stability and delivering a noticeably smoother user experience.",
        "Architected and deployed end-to-end CI/CD workflows for AI-driven initiatives at one of the largest Education & Learning Management (ELM) organizations in the U.S., accelerating release velocity and ensuring enterprise-grade reliability.",
        "Boosted AI application performance through deep collaboration with cross-functional teams, achieving a 25% reduction in latency and driving measurable improvements in user satisfaction and adoption."
      ],
      technologies: ["Angular.js", "C#", "Azure", "Docker", "Kubernetes", "Splunk", "AppDynamics"],
    },
    {
      title: "Associate Software Engineer",
      company: "MAQ Software",
      location: "Hyderabad, India",
      period: "Apr 2024 - Mar 2025",
      description:
        "As an Associate Software Engineer, I was responsible for building and maintaining industry-grade web applications designed for scalability and performance. My day-to-day involved developing robust backend services, integrating frontend components, collaborating closely with cross-functional teams, and contributing to architectural decisions. I also actively participated in code reviews to uphold coding standards and ensure consistency, readability, and long-term maintainability across our codebase. Additionally, I helped in identifying technical debt and improving overall development workflows within the organization.",
      achievements: [
        "Improved dashboard charts performance for a UK based industrial client, significantly enhancing user experience and data visualization, with up to 50% faster load times",
        "Developed an Electronic Medical Records(EMR) application for one of largest Eye Institutes in India",
        "Handled deployment and scaling of full stack web applications on Azure and On-Premise environments"
      ],
      technologies: ["Next.js", "FastAPI", "PostgreSQL", "Docker", "Linux System Administration", "Kubernetes"],
    },
  ]

  return (
    <div className="relative">
      {/* Timeline line */}
      <motion.div
        className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-300 via-neutral-400 to-transparent dark:from-neutral-600 dark:via-neutral-500 dark:to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
        style={{ transformOrigin: "top" }}
      />

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative flex items-start gap-4 md:gap-8 group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Timeline dot */}
            <motion.div className="relative z-10 flex-shrink-0">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-neutral-900 border-2 border-neutral-300 dark:border-neutral-600 flex items-center justify-center shadow-lg">
                <Briefcase className="h-4 w-4 md:h-6 md:w-6 text-neutral-600 dark:text-neutral-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="flex-1 border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="bg-neutral-50/50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700 p-4 sm:p-6">
                  <div className="flex flex-col gap-3">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                        {exp.title}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-neutral-600 dark:text-neutral-400 mt-2">
                        <div className="flex items-center gap-1 text-sm sm:text-base">
                          <Building className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="font-medium truncate">{exp.company}</span>
                        </div>
                        <span className="hidden sm:inline">•</span>
                        <div className="flex items-center gap-1 text-sm sm:text-base">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                          <span className="truncate">{exp.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 sm:px-3 py-1 rounded-full self-start">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{exp.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">{exp.description}</p>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">
                      <Award className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 flex-shrink-0" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          viewport={{ once: false, amount: 0.5 }}
                        >
                          <Star className="h-2 w-2 sm:h-3 sm:w-3 text-amber-500 mt-1 flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">Technologies Used</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: false, amount: 0.5 }}
                        >
                          <Badge className="text-xs sm:text-sm bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200 px-2 py-1">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    // Disable scroll restoration and reset to top on page load
    if (typeof window !== 'undefined') {
      // Disable Next.js scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }

      // Reset to top on page load/reload
      window.scrollTo(0, 0)
    }

    // Enhanced smooth scrolling with slower speed
    document.documentElement.style.scrollBehavior = "smooth"
    document.documentElement.style.scrollPaddingTop = "100px"

    // Add custom CSS for slower scrolling
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
        
        * {
          scroll-behavior: smooth;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.documentElement.style.scrollBehavior = "auto"
      document.documentElement.style.scrollPaddingTop = "0"
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const skills = [
    {
      category: "Frontend Development",
      icon: Code,
      color: "emerald",
      skills: [
        { name: "Tailwind CSS", image: "/frontend-skills/tailwindcss.svg?height=40&width=40" },
        { name: "TypeScript", image: "/frontend-skills/typescript.svg?height=40&width=40" },
        { name: "Angular", image: "/frontend-skills/angular.svg?height=40&width=40" },
        { name: "Next.js", image: "/frontend-skills/nextjs.svg?height=40&width=40" },
        { name: "Redux", image: "/frontend-skills/redux.svg?height=40&width=40" },
      ],
    },
    {
      category: "Backend Development",
      icon: Server,
      color: "blue",
      skills: [
        { name: "Rest APIs", image: "/backend-skills/restapi.svg?height=40&width=40" },
        { name: "FastAPI", image: "/backend-skills/fastapi.svg?height=40&width=40" },
        { name: "NestJS", image: "/backend-skills/nestjs.svg?height=40&width=40" },
        { name: ".NET", image: "/backend-skills/dotnet.svg?height=40&width=40" },
        { name: "Dapr", image: "/backend-skills/dapr.svg?height=40&width=40" },
        { name: "gRPC", image: "/backend-skills/grpc.svg?height=40&width=40" },
      ],
    },
    {
      category: "Database & DevOps",
      icon: Database,
      color: "purple",
      skills: [
        { name: "PostgreSQL", image: "/database&devops/postgres.svg?height=40&width=40" },
        { name: "MongoDB", image: "/database&devops/mongodb.svg?height=40&width=40" },
        { name: "Redis", image: "/database&devops/redis.svg?height=40&width=40" },
        { name: "RabbitMQ", image: "/database&devops/rabbitmq.svg?height=40&width=40" },
        { name: "Docker", image: "/database&devops/docker.svg?height=40&width=40" },
        { name: "Kubernetes", image: "/database&devops/kubernetes.svg?height=40&width=40" },
        { name: "Azure", image: "/database&devops/azure.svg?height=40&width=40" },
      ],
    },
    {
      category: "Testing & Tools",
      icon: Zap,
      color: "orange",
      skills: [
        { name: "Git", image: "/testing&tools/git.svg?height=40&width=40" },
        { name: "GitHub", image: "/testing&tools/github.svg?height=40&width=40" },
        { name: "VS Code", image: "/testing&tools/vscode.svg?height=40&width=40" },
        { name: "Figma", image: "/testing&tools/figma.svg?height=40&width=40" },
        { name: "Jest", image: "/testing&tools/jest.svg?height=40&width=40" },
        { name: "xUnit", image: "/testing&tools/xunit.png?height=40&width=40" },
      ],
    },
  ]

  // const projects = [
  //   {
  //     title: "E-Commerce Platform",
  //     description:
  //       "Full-stack e-commerce solution with microservices architecture, Redis caching, and automated deployment pipeline. Features include real-time inventory management, payment processing, and admin dashboard.",
  //     tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "AWS", "Redis"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: true,
  //     stats: { users: "10k+", uptime: "99.9%", performance: "A+" },
  //   },
  //   {
  //     title: "Real-time Analytics Dashboard",
  //     description:
  //       "Real-time data visualization platform with WebSocket connections and automated data processing pipelines. Includes custom charts, alerts, and export functionality.",
  //     tech: ["React", "Express", "MongoDB", "Socket.io", "Jenkins", "D3.js"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: true,
  //     stats: { dataPoints: "1M+", latency: "<100ms", accuracy: "99.5%" },
  //   },
  //   {
  //     title: "DevOps Automation Suite",
  //     description:
  //       "Comprehensive DevOps toolkit for automated testing, deployment, and monitoring across multiple environments. Includes infrastructure as code and automated scaling.",
  //     tech: ["Python", "Terraform", "Kubernetes", "Prometheus", "Grafana"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: false,
  //     stats: { deployments: "500+", downtime: "0.1%", efficiency: "+60%" },
  //   },
  //   {
  //     title: "Task Management App",
  //     description:
  //       "Collaborative task management application with real-time updates, file sharing, and team collaboration features. Built with modern React patterns.",
  //     tech: ["React", "Firebase", "Material-UI", "PWA"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: false,
  //     stats: { teams: "100+", tasks: "50k+", satisfaction: "4.8/5" },
  //   },
  //   {
  //     title: "API Gateway Service",
  //     description:
  //       "Scalable API gateway with rate limiting, authentication, and monitoring. Handles traffic routing and load balancing for microservices architecture.",
  //     tech: ["Node.js", "Express", "Redis", "Docker", "Nginx"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: false,
  //     stats: { requests: "1M+/day", latency: "50ms", availability: "99.99%" },
  //   },
  //   {
  //     title: "Machine Learning Pipeline",
  //     description:
  //       "End-to-end ML pipeline for data processing, model training, and deployment. Includes automated retraining and model versioning.",
  //     tech: ["Python", "TensorFlow", "Docker", "Kubernetes", "MLflow"],
  //     image: "/placeholder.svg?height=300&width=400",
  //     link: "#",
  //     github: "#",
  //     featured: false,
  //     stats: { models: "15+", accuracy: "94%", predictions: "100k+/day" },
  //   },
  // ]

  // const featuredProjects = projects.filter((p) => p.featured)
  // const otherProjects = projects.filter((p) => !p.featured)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-poppins overflow-x-hidden w-full">
      <ScrollProgress />
      <ScrollToTop />

      {/* Enhanced Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800"
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="font-bold text-2xl text-neutral-900 dark:text-neutral-100"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              saikota.in
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {["about", "experience", "skills", "projects", "contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-full"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  ) : (
                    <Menu className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={mobileMenuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800 mt-4">
              {["about", "experience", "skills", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 font-medium px-4 py-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-2 sm:px-4 relative overflow-hidden">
        <motion.div className="container mx-auto text-center relative z-10 px-2 sm:px-4" style={{ opacity }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-600"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image src="/profile.jpg?height=128&width=128" alt="Profile" fill className="object-cover" />
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Full Stack Developer
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-2 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              & DevOps Engineer
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Crafting scalable web applications and robust infrastructure solutions with 1.5 years of hands-on
              experience
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="mailto:saikotareddy07@gmail.com">
                  <Button
                    size="lg"
                    className="group bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Me
                    <motion.div
                      className="ml-2"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </a>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group bg-transparent border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              {[
                { value: 18, label: "Months Experience", color: "emerald" },
                { value: 25, label: "Projects Completed", color: "blue" },
                { value: 15, label: "Technologies Mastered", color: "purple" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, delay: 1.3 + index * 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold mb-2 ${stat.color === "emerald"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : stat.color === "blue"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-purple-600 dark:text-purple-400"
                      }`}
                  >
                    <AnimatedCounter end={stat.value} />+
                  </div>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-16"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ChevronDown className="h-6 w-6 mx-auto text-neutral-400 dark:text-neutral-500" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-2 sm:px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            About Me
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                I'm a passionate Full Stack Developer with DevOps expertise, dedicated to building scalable web
                applications and maintaining robust infrastructure. With 1.5 years of professional experience, I've
                worked on diverse projects ranging from e-commerce platforms to real-time analytics dashboards.
              </p>
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                My journey in tech has equipped me with a comprehensive understanding of both frontend and backend
                technologies, along with modern DevOps practices including containerization, CI/CD pipelines, and cloud
                infrastructure management.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Problem Solver", "Team Player", "Quick Learner", "Innovation Focused"].map((trait, index) => (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: false, amount: 0.5 }}
                  >
                    <Badge className="px-4 py-2 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:scale-105 transition-all duration-200">
                      {trait}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                { icon: Code, title: "Frontend", desc: "React, Next.js, TypeScript", color: "emerald" },
                { icon: Server, title: "Backend", desc: "Node.js, Python, APIs", color: "blue" },
                { icon: Database, title: "Database", desc: "PostgreSQL, MongoDB", color: "purple" },
                { icon: Cloud, title: "DevOps", desc: "AWS, Docker, CI/CD", color: "orange" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <Card className="p-6 text-center border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <item.icon
                      className={`h-8 w-8 mx-auto mb-4 ${item.color === "emerald"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : item.color === "blue"
                          ? "text-blue-600 dark:text-blue-400"
                          : item.color === "purple"
                            ? "text-purple-600 dark:text-purple-400"
                            : "text-orange-600 dark:text-orange-400"
                        }`}
                    />
                    <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100 text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section with Timeline */}
      <section id="experience" className="py-16 px-2 sm:px-4 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Professional Experience</h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              My journey through various roles has shaped me into a versatile developer with strong technical and
              leadership skills.
            </p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Enhanced Technical Skills Section */}
      <section id="skills" className="py-16 px-2 sm:px-4 bg-white dark:bg-neutral-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 overflow-hidden">
          <div className="absolute top-10 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 border border-neutral-300 dark:border-neutral-600 rounded-full"></div>
          <div className="absolute top-32 right-4 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 border border-neutral-300 dark:border-neutral-600 rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-6 h-6 sm:w-12 sm:h-12 border border-neutral-300 dark:border-neutral-600 rounded-full"></div>
          <div className="absolute bottom-32 right-1/3 w-4 h-4 sm:w-8 sm:h-8 border border-neutral-300 dark:border-neutral-600 rounded-lg"></div>
        </div>

        <div className="container mx-auto relative z-10 px-2 sm:px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">Technical Expertise</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">Skills & Technologies</h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              A comprehensive showcase of my technical proficiency across modern development stacks, tools, and
              methodologies that power today's digital solutions.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 mb-12">
              {skills.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  className="group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <Card className="h-full bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02] overflow-hidden relative">
                    {/* Card Header with Icon */}
                    <div className="relative p-6 pb-4">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          className={`p-4 rounded-2xl ${category.color === "emerald"
                            ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-500/25"
                            : category.color === "blue"
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-500/25"
                              : category.color === "purple"
                                ? "bg-gradient-to-br from-purple-500 to-purple-600 shadow-purple-500/25"
                                : "bg-gradient-to-br from-orange-500 to-orange-600 shadow-orange-500/25"
                            } shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <category.icon className="h-7 w-7 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                            {category.category}
                          </h3>
                          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                            {category.skills.length} Technologies
                          </p>
                        </div>
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            className="group/skill flex flex-col items-center p-4 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            whileHover={{ y: -4 }}
                          >
                            <div className="w-12 h-12 mb-3 rounded-lg bg-transparent flex items-center justify-center overflow-hidden group-hover/skill:scale-110 transition-transform duration-300">
                              <Image
                                src={skill.image || "/placeholder.svg"}
                                alt={skill.name}
                                width={48}
                                height={48}
                                className="w-10 h-10 p-1 object-contain bg-white"
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 text-center leading-tight">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 ${category.color === "emerald"
                        ? "bg-gradient-to-bl from-emerald-500/10 to-transparent"
                        : category.color === "blue"
                          ? "bg-gradient-to-bl from-blue-500/10 to-transparent"
                          : category.color === "purple"
                            ? "bg-gradient-to-bl from-purple-500/10 to-transparent"
                            : "bg-gradient-to-bl from-orange-500/10 to-transparent"
                        } rounded-bl-full`}
                    />
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Skills Summary Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              {[
                {
                  label: "Frontend",
                  count: skills[0].skills.length,
                  icon: Code,
                  color: "emerald",
                },
                {
                  label: "Backend",
                  count: skills[1].skills.length,
                  icon: Server,
                  color: "blue",
                },
                {
                  label: "Database & DevOps",
                  count: skills[2].skills.length,
                  icon: Database,
                  color: "purple",
                },
                {
                  label: "Tools & Others",
                  count: skills[3].skills.length,
                  icon: Zap,
                  color: "orange",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <motion.div
                      className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${stat.color === "emerald"
                        ? "bg-emerald-100 dark:bg-emerald-900/30"
                        : stat.color === "blue"
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : stat.color === "purple"
                            ? "bg-purple-100 dark:bg-purple-900/30"
                            : "bg-orange-100 dark:bg-orange-900/30"
                        }`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon
                        className={`h-6 w-6 ${stat.color === "emerald"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : stat.color === "blue"
                            ? "text-blue-600 dark:text-blue-400"
                            : stat.color === "purple"
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-orange-600 dark:text-orange-400"
                          }`}
                      />
                    </motion.div>
                    <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                      <AnimatedCounter end={stat.count} />
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
                Always learning and adapting to new technologies. Let's discuss how these skills can bring value to your
                next project.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a href="mailto:saikotareddy07@gmail.com">
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Let's Collaborate
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      {/* <section id="projects" className="py-16 px-4 bg-neutral-50 dark:bg-neutral-950">
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      {/* <section id="projects" className="py-16 px-4 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">Featured Projects</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A showcase of my best work, demonstrating expertise in full-stack development and DevOps practices.
            </p>
          </motion.div>

          <div className="mb-16">
            <motion.h3
              className="text-2xl font-semibold mb-8 flex items-center gap-2 text-neutral-900 dark:text-neutral-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Star className="h-6 w-6 text-amber-500" />
              Highlighted Projects
            </motion.h3>
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <Card className="group overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-3">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              className="bg-white text-neutral-900 hover:bg-neutral-100 font-medium shadow-lg"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-white text-white hover:bg-white hover:text-neutral-900 font-medium"
                            >
                              <Github className="h-4 w-4 mr-2" />
                              Code
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-3 text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-neutral-900 dark:text-neutral-100">{value}</div>
                            <div className="text-xs text-neutral-600 dark:text-neutral-400 capitalize font-medium">
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: false, amount: 0.5 }}
                          >
                            <Badge className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200">
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <motion.h3
              className="text-2xl font-semibold mb-8 flex items-center gap-2 text-neutral-900 dark:text-neutral-100"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Code className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
              More Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: false, amount: 0.2 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <Card className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="secondary" size="sm" className="shadow-lg">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="outline" size="sm" className="bg-white text-neutral-900 shadow-lg">
                              <Github className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="text-center p-2 bg-neutral-50 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700"
                          >
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">{value}</div>
                            <div className="text-neutral-500 dark:text-neutral-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            className="text-xs bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.tech.length > 3 && (
                          <Badge className="text-xs bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-200">
                            +{project.tech.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-16 px-2 sm:px-4 bg-white dark:bg-neutral-900">
        <div className="container mx-auto text-center px-2 sm:px-4">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            Let's Work Together
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="mailto:saikotareddy07@gmail.com">
                <Button
                  size="lg"
                  className="group bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </Button>
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="group bg-transparent border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <Separator className="my-8 max-w-xs mx-auto bg-neutral-300 dark:bg-neutral-600" />

          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {[
              { icon: Github, href: "https://github.com/saikota01" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/saireddem" },
              { icon: Twitter, href: "https://x.com/saikota07" },
            ].map((social, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full w-12 h-12 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 shadow-sm"
                  onClick={() => window.open(social.href, "_blank")}
                >
                  <social.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto text-center">
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} saikota.in. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Portfolio />
    </ThemeProvider>
  )
}
