import mic from '../images/mic.svg';

export default function AudioGallery({files}) {

  const style = {
    backgroundColor: 'rgba(var(--bs-primary-rgb), 0.05)',
    border: '1px solid rgba(var(--bs-primary-rgb))',
    padding: '20px'
  }

  return (
    <div className="audio-gallery" style={style}>
      <h2>Audio Recordings From This Location</h2>
      {files.map((audio) => (
        <div key={audio.src} className="">
          <h3 className="mt-4"><img src={mic} alt=""/>{audio.title}</h3>
          <audio controls src={`/audio/${audio.src}`} className="w-100"/>
          {audio.desc && <p>{audio.desc}</p>}
        </div>
      ))}
    </div>
  );
}