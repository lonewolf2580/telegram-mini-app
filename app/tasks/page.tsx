'use client';
import BottomMenu from '../components/BottomMenu';

export default function Tasks() {
  return (
    <div style={{ paddingBottom: '70px', textAlign: 'center' }}>
      <h1 style={{ marginTop: '20px', fontSize: '24px' }}>📋 Tasks</h1>
      <p>Complete tasks to earn rewards.</p>
      <BottomMenu />
    </div>
  );
}
