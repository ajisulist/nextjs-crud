import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style={{
      display: 'block',
      animationPlayState: 'paused',
    }}
    {...props}
  >
    <circle
      cx={50}
      cy={50}
      fill="none"
      stroke="#f5f5f5"
      strokeWidth={10}
      r={35}
      strokeDasharray="164.93361431346415 56.97787143782138"
      style={{
        animationPlayState: 'paused',
      }}
    />
  </svg>
);

export default SvgComponent;
