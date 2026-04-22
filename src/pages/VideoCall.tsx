import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, CircleDot,
  ChevronRight, X, Check, Volume2, MonitorUp
} from 'lucide-react'

// ==================== GLITCH DATA REEL ====================
function GlitchDataReel({ label, value, unit }: { label: string; value: string; unit: string }) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      let count = 0
      const glitchInterval = setInterval(() => {
        setDisplayValue(Math.random().toString().slice(2, 6))
        count++
        if (count > 10) {
          clearInterval(glitchInterval)
          setDisplayValue(value)
          setIsGlitching(false)
        }
      }, 60)
    }, 3000)
    return () => clearInterval(interval)
  }, [value])

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-cyan-400/60 uppercase tracking-wider w-8">{label}</span>
      <span className={`font-mono text-xs ${isGlitching ? 'text-cyan-300' : 'text-white'} transition-colors`}>
        {displayValue}<span className="text-cyan-400/50 text-[10px]">{unit}</span>
      </span>
    </div>
  )
}

// ==================== AI INSIGHT TYPING ====================
function AIInsightTyping({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    indexRef.current = 0
    setDisplayed('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, 30)

    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {!isComplete && <span className="inline-block w-[2px] h-3 bg-cyan ml-0.5 animate-blink-cursor" />}
    </span>
  )
}

// ==================== FACE MESH CANVAS ====================
function FaceMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl')
    if (!gl) return

    canvas.width = 400
    canvas.height = 300

    const vsSource = `
      attribute vec4 aPosition;
      void main() {
        gl_Position = aPosition;
      }
    `
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uScanline;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      float faceSdf(vec2 p) {
        p.y *= 1.15;
        float d = length(p) - 0.35;
        d = smoothstep(0.0, 0.08, d);
        return 1.0 - d;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec2 center = uv - 0.5;
        center.x *= uResolution.x / uResolution.y;

        float faceMask = faceSdf(center);
        float scanDist = abs(uv.y - uScanline);
        float scanGlow = exp(-scanDist * scanDist * 800.0) * 0.6;

        float noise = snoise(vec3(center * 4.0, uTime * 0.5)) * 0.5 + 0.5;
        float grid = step(0.92, fract(center.x * 25.0)) + step(0.92, fract(center.y * 25.0));

        float intensity = faceMask * (0.3 + noise * 0.4 + grid * 0.3 + scanGlow);

        vec3 color1 = vec3(0.0, 0.85, 0.93);
        vec3 color2 = vec3(1.0, 0.2, 0.4);
        vec3 finalColor = mix(color1, color2, noise) * intensity;

        gl_FragColor = vec4(finalColor, intensity * 0.7);
      }
    `

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const aPosition = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'uTime')
    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uScanline = gl.getUniformLocation(program, 'uScanline')

    gl.uniform2f(uResolution, canvas.width, canvas.height)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    let animId: number
    const render = () => {
      const t = performance.now() * 0.001
      gl.uniform1f(uTime, t)
      gl.uniform1f(uScanline, (t * 0.15) % 2.6 - 0.2)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="webgl-overlay"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 10 }}
    />
  )
}

// ==================== MAIN VIDEO CALL PAGE ====================
export default function VideoCall() {
  const navigate = useNavigate()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isRecording, setIsRecording] = useState(true)
  const [showJoinRequest, setShowJoinRequest] = useState(true)
  const [callDuration, setCallDuration] = useState(0)
  const [aiNotes, setAiNotes] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const notesContainerRef = useRef<HTMLDivElement>(null)

  // Call timer
  useEffect(() => {
    const interval = setInterval(() => setCallDuration(d => d + 1), 1000)
    return () => clearInterval(interval)
  }, [])

  // Play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  // Simulate AI notes being added
  useEffect(() => {
    const notes = [
      '**Lab Results:**\nCholesterol levels are within the target range, showing improvement from last visit. HDL increased to 58 mg/dL.',
      '**Medication:**\nDr. Jhony Grille advised continuing current medication as prescribed. No changes needed at this time.',
      '**Dietary Advice:**\nMove leafy greens and lean proteins into your meals for better heart health. Reduce sodium intake.',
      '**Questions:**\nAddressed your queries regarding potential side effects of the medication. Mild dizziness is normal for first 2 weeks.',
      '**Follow-up:**\nSeptember 15th at 2:00 PM. Bring updated blood work results.',
    ]
    let index = 0
    const interval = setInterval(() => {
      if (index < notes.length) {
        setAiNotes(prev => [...prev, notes[index]])
        index++
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll AI notes
  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop = notesContainerRef.current.scrollHeight
    }
  }, [aiNotes])

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const participants = [
    { name: 'Michael Jackson', role: 'Patient', img: '/avatars/user-avatar.jpg' },
    { name: 'Jessica Regal', role: 'Nurse', img: '/avatars/dr-sofia.jpg' },
    { name: 'Eva Donald', role: 'Caregiver', img: '/avatars/dr-segnil.jpg' },
  ]

  return (
    <div className="h-screen flex bg-[#1a1a2e]">
      {/* Left Panel - AI Summary */}
      <div className="w-[380px] bg-white/95 backdrop-blur-xl flex flex-col border-r border-white/10">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Contact List</span>
            <button onClick={() => navigate('/chat')} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200">
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="bg-coral/5 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-slate-800 mb-2">Summary</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dr. Smith explained that your cholesterol levels have improved since your last check-up.
              He also recommended continuing your current medication and provided tips for maintaining a heart-healthy diet.
            </p>
          </div>
        </div>

        {/* AI Notes */}
        <div ref={notesContainerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            Key discussion points
            <span className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" style={{ animationDelay: '0.4s' }} />
            </span>
          </h3>

          {aiNotes.map((note, i) => {
            const [heading, ...body] = note.split('\n')
            const bodyText = body.join('\n')
            return (
              <div key={i} className="animate-fade-in">
                <h4 className="text-xs font-bold text-slate-700 mb-1">{heading.replace(/\*\*/g, '')}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  <AIInsightTyping text={bodyText} />
                </p>
              </div>
            )
          })}

          {aiNotes.length === 0 && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CircleDot className="w-3 h-3 text-coral animate-pulse" />
              Analyzing conversation...
            </div>
          )}
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Join Request Toast */}
        {showJoinRequest && (
          <div className="absolute top-6 right-6 z-50 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-4 animate-slide-up">
            <p className="text-sm text-slate-700">Dr. Alex Balck wants to join the call</p>
            <div className="flex gap-2">
              <button onClick={() => setShowJoinRequest(false)} className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200">
                <X className="w-4 h-4 text-red-500" />
              </button>
              <button onClick={() => setShowJoinRequest(false)} className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200">
                <Check className="w-4 h-4 text-emerald-500" />
              </button>
            </div>
          </div>
        )}

        {/* Video Container */}
        <div className="flex-1 relative bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
            {/* Video */}
            <video
              ref={videoRef}
              src="/videos/dr-video.mp4"
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Face Mesh Overlay */}
            <FaceMeshCanvas />

            {/* Recording Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full">
              <CircleDot className="w-3 h-3 text-red-400 animate-pulse" />
              <span className="text-xs text-white/90 font-medium">Recording in progress</span>
              <MonitorUp className="w-3 h-3 text-white/60" />
            </div>

            {/* Doctor Info */}
            <div className="absolute top-4 left-4 z-20">
              <p className="text-white font-semibold text-sm">Dr. Jhony Grille</p>
              <p className="text-white/60 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online
              </p>
            </div>

            {/* Biometric HUD */}
            <div className="absolute top-20 right-4 z-20 space-y-2 bg-black/30 backdrop-blur-sm p-3 rounded-xl">
              <GlitchDataReel label="BP" value="120/80" unit=" mmHg" />
              <GlitchDataReel label="HR" value="72" unit=" BPM" />
              <GlitchDataReel label="O2" value="98" unit="%" />
            </div>

            {/* Call Timer */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
              <span className="text-xs text-white/80 font-mono">{formatTime(callDuration)}</span>
            </div>
          </div>

          {/* Self View */}
          <div className="absolute bottom-24 right-8 w-40 h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white/20 z-20">
            <img src="/avatars/user-avatar.jpg" alt="You" className="w-full h-full object-cover" />
            <div className="absolute bottom-1 left-2 text-[10px] text-white/80 bg-black/40 px-1.5 rounded">You</div>
          </div>
        </div>

        {/* Participant Thumbnails */}
        <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 flex items-center gap-3">
          {participants.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-white/10">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-navy/80 flex items-center justify-center">
                  <Volume2 className="w-2.5 h-2.5 text-white/70" />
                </div>
              </div>
              <span className="text-[10px] text-white/60">{p.name.split(' ')[0]}</span>
            </div>
          ))}
          <button className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors ml-2">
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Call Controls */}
        <div className="bg-slate-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isMuted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isVideoOff ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isRecording ? 'bg-coral text-white shadow-coral' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <CircleDot className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl hover:bg-red-600 transition-all hover:scale-105"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
