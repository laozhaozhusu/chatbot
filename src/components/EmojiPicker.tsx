import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../ChatBot.css";

/**
 * 微信风格表情分类
 */
const EMOJI_CATEGORIES = [
  {
    name: "最近",
    icon: "🕒",
    emojis: [],
  },
  {
    name: "默认",
    icon: "😀",
    emojis: [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣",
      "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰",
      "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜",
      "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏",
      "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
      "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠",
      "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨",
      "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥",
      "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧",
      "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
      "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑",
    ],
  },
  {
    name: "手势",
    icon: "👍",
    emojis: [
      "👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️",
      "🤟", "🤘", "👌", "🤌", "🤏", "👈", "👉", "👆",
      "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖",
      "👏", "🙌", "🤲", "🤝", "🙏", "✍️", "💪", "🦾",
      "🦿", "🦵", "🦶", "👂", "🦻", "👃", "👶", "👧",
      "🧒", "👦", "👩", "🧑", "👨", "👩‍🦱", "🧑‍🦱", "👨‍🦱",
    ],
  },
  {
    name: "物品",
    icon: "👓",
    emojis: [
      "👓", "🕶️", "🥽", "🥼", "🦺", "👔", "👕", "👖",
      "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱",
      "🩲", "🩳", "👙", "👚", "👛", "👜", "👝", "🛍️",
      "🎒", "👞", "👟", "🥾", "🥿", "👠", "👡", "🩰",
      "👢", "👑", "👒", "🎩", "🎓", "🧢", "⛑️", "💄",
      "💍", "💼", "☂️", "🌂", "🧳", "🧭", "🧱", "🧲",
      "🧴", "🧷", "🧹", "🧺", "🧻", "🧼", "🧽", "🧯",
    ],
  },
  {
    name: "自然",
    icon: "🌱",
    emojis: [
      "🌱", "🌲", "🌳", "🌴", "🌵", "🌶️", "🌷", "🌸",
      "🌹", "🌺", "🌻", "🌼", "🌾", "🌿", "☘️", "🍀",
      "🍁", "🍂", "🍃", "🍄", "🌰", "🌍", "🌎", "🌏",
      "🌐", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗",
      "🌘", "🌙", "🌚", "🌛", "🌜", "🌝", "🌞", "⭐",
      "🌟", "🌠", "☀️", "⛅", "☁️", "⛈️", "🌤️", "🌥️",
      "🌦️", "🌧️", "🌨️", "🌩️", "🌪️", "🌫️", "🌬️", "🌀",
      "🌈", "☂️", "☔", "⚡", "❄️", "☃️", "⛄", "🔥",
    ],
  },
  {
    name: "食物",
    icon: "🍎",
    emojis: [
      "🍎", "🍏", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇",
      "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝",
      "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🌽",
      "🥕", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨",
      "🧀", "🥚", "🍳", "🥞", "🥓", "🥩", "🍗", "🍖",
      "🌭", "🍔", "🍟", "🍕", "🥪", "🥙", "🌮", "🌯",
      "🥗", "🥘", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣",
      "🍱", "🍘", "🍙", "🍚", "🍙", "🍢", "🍡", "🍧",
    ],
  },
  {
    name: "活动",
    icon: "⚽",
    emojis: [
      "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉",
      "🥏", "🎱", "🏓", "🏸", "🥅", "🏒", "🏑", "🏏",
      "🥍", "🏹", "🎣", "🥊", "🥋", "🎽", "🛹", "🛷",
      "⛸️", "🥌", "🎿", "⛷️", "🏂", "🏋️", "🤼", "🤸",
      "🤺", "⛹️", "🤹", "🧘", "🏄", "🏊", "🤽", "🚣",
      "🧗", "🚵", "🚴", "🏇", "🤾", "🏌️", "🏆", "🥇",
      "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️",
      "🎪", "🤹", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧",
    ],
  },
  {
    name: "符号",
    icon: "❤️",
    emojis: [
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍",
      "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖",
      "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️",
      "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈",
      "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐",
      "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️",
      "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️",
      "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹",
    ],
  },
];

/**
 * EmojiPicker 组件属性
 */
export interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * 表情选择器组件
 * 职责：显示表情选择器，支持分类浏览和选择表情
 */
const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onSelect,
  onClose,
  triggerRef,
}) => {
  const [activeCategory, setActiveCategory] = useState(1); // 默认显示"默认"分类
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const pickerRef = useRef<HTMLDivElement>(null);

  /**
   * 计算表情选择器的位置（使用固定定位，相对于视口）
   * 优先显示在按钮上方，如果空间不够则显示在下方
   */
  useEffect(() => {
    const updatePosition = () => {
      if (!triggerRef?.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();

      // 表情选择器尺寸
      const pickerWidth = 400;
      const pickerHeight = 300;
      const gap = 8;
      const padding = 16; // 距离视口边缘的最小距离

      // 获取视口尺寸
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 计算可用空间
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const buttonCenterX = triggerRect.left + triggerRect.width / 2;
      const buttonLeft = triggerRect.left;
      const buttonRight = triggerRect.right;

      // 确定垂直位置：优先显示在按钮上方
      let top: number;
      
      if (spaceAbove >= pickerHeight + gap) {
        // 上方空间足够，显示在上方
        top = triggerRect.top - pickerHeight - gap;
      } else if (spaceBelow >= pickerHeight + gap) {
        // 下方空间足够，显示在下方
        top = triggerRect.bottom + gap;
      } else {
        // 上下空间都不够，选择空间更大的方向，并适当调整
        if (spaceAbove > spaceBelow) {
          // 显示在上方，但可能被裁剪
          top = Math.max(padding, triggerRect.top - pickerHeight - gap);
        } else {
          // 显示在下方，但可能被裁剪
          top = Math.min(
            viewportHeight - pickerHeight - padding,
            triggerRect.bottom + gap
          );
        }
      }

      // 确定水平位置：智能定位，优先让选择器尽可能接近按钮
      let left: number;

      // 计算按钮相对于视口的位置
      const spaceOnLeft = buttonLeft;
      const spaceOnRight = viewportWidth - buttonRight;

      // 策略：优先左对齐按钮，但确保选择器大部分在可视区域内
      // 如果按钮在左侧，尽量让选择器向右偏移一点，避免超出左边界
      // 如果按钮在右侧，尽量让选择器向左偏移一点，避免超出右边界
      
      if (spaceOnLeft < padding && spaceOnRight > spaceOnLeft) {
        // 按钮靠近左边界，尝试让选择器更多部分在右侧
        // 尝试让按钮在选择器的左侧部分
        left = Math.max(padding, buttonLeft - (pickerWidth * 0.3));
      } else if (spaceOnRight < padding && spaceOnLeft > spaceOnRight) {
        // 按钮靠近右边界，尝试让选择器更多部分在左侧
        // 尝试让按钮在选择器的右侧部分
        left = Math.min(
          viewportWidth - pickerWidth - padding,
          buttonRight - (pickerWidth * 0.7)
        );
      } else {
        // 按钮在中间区域，优先左对齐按钮左边缘
        left = buttonLeft;
      }

      // 边界检查和调整
      if (left < padding) {
        left = padding;
      } else if (left + pickerWidth > viewportWidth - padding) {
        left = viewportWidth - pickerWidth - padding;
      }

      // 如果调整后选择器离按钮太远，尝试中心对齐
      const pickerRight = left + pickerWidth;
      const distanceFromButton = Math.min(
        Math.abs(left - buttonLeft),
        Math.abs(pickerRight - buttonRight)
      );
      
      // 如果距离太远（超过选择器宽度的50%），尝试中心对齐
      if (distanceFromButton > pickerWidth * 0.5) {
        const centerAlignedLeft = buttonCenterX - pickerWidth / 2;
        if (centerAlignedLeft >= padding && centerAlignedLeft + pickerWidth <= viewportWidth - padding) {
          left = centerAlignedLeft;
        }
      }

      // 最终边界检查，确保完全在视口内
      left = Math.max(padding, Math.min(left, viewportWidth - pickerWidth - padding));
      top = Math.max(padding, Math.min(top, viewportHeight - pickerHeight - padding));

      setPosition({ top, left });
    };

    // 立即更新位置
    updatePosition();

    // 延迟一帧再次更新，确保布局稳定
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(updatePosition);
    });

    // 监听窗口大小变化和滚动
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [triggerRef]);

  /**
   * 点击外部关闭表情选择器
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 检查是否点击在表情选择器外部
      if (
        pickerRef.current &&
        !pickerRef.current.contains(target) &&
        !target.closest(".emoji-picker-trigger") &&
        !(triggerRef?.current && triggerRef.current.contains(target))
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, triggerRef]);

  /**
   * 处理分类切换
   */
  const handleCategoryChange = (index: number) => {
    // 如果选择的是"最近"分类但没有表情，则切换到"默认"分类
    if (index === 0 && EMOJI_CATEGORIES[0].emojis.length === 0) {
      setActiveCategory(1);
    } else {
      setActiveCategory(index);
    }
  };

  /**
   * 处理表情选择
   */
  const handleEmojiSelect = (emoji: string) => {
    onSelect(emoji);
    onClose?.();
  };

  // 获取当前分类的表情
  const currentCategory = EMOJI_CATEGORIES[activeCategory] || EMOJI_CATEGORIES[1];

  const pickerContent = (
    <div
      className="emoji-picker wechat-style"
      ref={pickerRef}
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* 表情列表区域 */}
      <div className="emoji-list-container">
        <div className="emoji-list">
          {currentCategory.emojis.length > 0 ? (
            currentCategory.emojis.map((emoji, index) => (
              <button
                key={index}
                className="emoji-item"
                onClick={() => handleEmojiSelect(emoji)}
                title={emoji}
              >
                {emoji}
              </button>
            ))
          ) : (
            <div className="emoji-empty">暂无表情</div>
          )}
        </div>
      </div>

      {/* 底部分类标签栏 */}
      <div className="emoji-categories-bar">
        {EMOJI_CATEGORIES.map((category, index) => (
          <button
            key={index}
            className={`emoji-category ${activeCategory === index ? "active" : ""}`}
            onClick={() => handleCategoryChange(index)}
            title={category.name}
            disabled={index === 0 && category.emojis.length === 0}
          >
            {category.icon}
          </button>
        ))}
      </div>
    </div>
  );

  // 使用 Portal 渲染到 body，使用固定定位
  return createPortal(pickerContent, window.document.body);
};

export default EmojiPicker;

